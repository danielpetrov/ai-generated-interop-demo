#!/usr/bin/env python3
"""
List remote NotebookLM notebooks by scraping the dashboard.
"""
import sys
import time
from pathlib import Path
from patchright.sync_api import sync_playwright

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from auth_manager import AuthManager
from browser_utils import BrowserFactory

def list_remote_notebooks():
    auth = AuthManager()
    if not auth.is_authenticated():
        print("Not authenticated")
        return

    playwright = None
    context = None
    try:
        playwright = sync_playwright().start()
        context = BrowserFactory.launch_persistent_context(playwright, headless=True)
        page = context.new_page()
        
        print("Navigating to dashboard...")
        page.goto("https://notebooklm.google.com/", wait_until="domcontentloaded")
        
        # Wait for any notebook link
        try:
            page.wait_for_selector("a[href*='/notebook/']", timeout=15000)
        except:
            print("No notebooks found or timeout waiting for dashboard.")
            # Maybe take a screenshot or dump content if needed, but for now just exit
            return

        # Find all notebook links
        # The structure is usually a card with a link. 
        # We look for anchors with /notebook/ in href.
        # We need to filter out duplicates or non-notebook links if any.
        links = page.query_selector_all("a[href*='/notebook/']")
        
        found = {}
        for link in links:
            href = link.get_attribute("href")
            if not href: continue
            
            # Normalize URL
            if href.startswith("/"):
                href = "https://notebooklm.google.com" + href
            
            # Extract ID usually at the end
            # URL format: https://notebooklm.google.com/notebook/UUID
            
            # Title is usually inside the link or a child div
            title = link.inner_text().strip()
            if not title:
                # Try to find a title element inside
                title_el = link.query_selector(".title, h2, h3, div[role='heading']")
                if title_el:
                    title = title_el.inner_text().strip()
            
            if not title:
                title = "Untitled Notebook"

            # Avoid duplicates
            if href not in found:
                found[href] = title

        if found:
            print(f"Found {len(found)} remote notebooks:")
            for url, title in found.items():
                print(f"URL: {url} | Title: {title}")
        else:
            print("No notebooks found on dashboard.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if context: context.close()
        if playwright: playwright.stop()

if __name__ == "__main__":
    list_remote_notebooks()
