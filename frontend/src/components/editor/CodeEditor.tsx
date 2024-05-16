import { Editor } from "@monaco-editor/react";

const DefaultCode: string = `import sys

def main(args):
  print(args)

if __name__ == "__main__":
  args = sys.argv
  main(args[1])
`;

export const IDE = () => {
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async () => {
    console.log("3秒後に表示");
  };
  return (
    <div className="flex items-start flex-col">
      <div className="w-full p-2  border">
        <form action="#" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
              height="40vh"
              defaultLanguage="python"
              defaultValue={DefaultCode}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                提出
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
