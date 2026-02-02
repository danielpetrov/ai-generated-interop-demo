import sys
import argparse
from pathlib import Path
from ask_question import ask_notebooklm, NotebookLibrary

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--question', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()

    library = NotebookLibrary()
    active = library.get_active_notebook()
    if not active:
        print("No active notebook")
        return

    answer = ask_notebooklm(args.question, active['url'], headless=True)
    
    with open(args.output, 'w', encoding='utf-8') as f:
        if answer:
            f.write(answer)
        else:
            f.write("FAILED_TO_GET_ANSWER")

if __name__ == "__main__":
    main()
