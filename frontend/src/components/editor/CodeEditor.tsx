import { Editor } from "@monaco-editor/react";
import { Button } from "@mui/material";

const DefaultCode: string = `import sys

def main(args):
  print(args)

if __name__ == "__main__":
  args = sys.argv
  main(args[1])
`;

export const IDE = () => {
  const handleSubmit = async () => {
    console.log("3秒後に表示");
  };
  return (
    <div className="flex items-start flex-col">
      <div className="w-full p-2  border">
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
            <Button
              onClick={() => handleSubmit()}
              variant="outlined"
              color="error"
            >
              提出
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
