"use client";

import { HintInstructionTypes, HintInstructions } from "@/types/hintBot";
import { AddCircle, DeleteForever } from "@mui/icons-material";
import { IconButton, Input, MenuItem, Select } from "@mui/material";
import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";

type enabledHintInstructionTypesType = HintInstructionTypes[];
type ChatBotSettingContextType = {
  enabledHintInstructionTypes: enabledHintInstructionTypesType;
  setEnabledHintInstructionTypes: (v: enabledHintInstructionTypesType) => void;
  setEnabledHintInstructionType: (
    key: HintInstructionTypes,
    enabled: boolean,
  ) => void;
};

const enabledHintInstructionTypesInitialValue = Object.keys(
  HintInstructions,
) as HintInstructionTypes[];
const ChatBotSettingContext = createContext<ChatBotSettingContextType>({
  //Enabled Hint Instruction Types
  enabledHintInstructionTypes: enabledHintInstructionTypesInitialValue,
  setEnabledHintInstructionTypes: (v: enabledHintInstructionTypesType) => {},
  setEnabledHintInstructionType: (key: string, enabled: boolean) => {},
});

export const ChatBotSettingContextProvider: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const [enabledHintInstructionTypes, setEnabledHintInstructionTypes] =
    useState<enabledHintInstructionTypesType>(
      enabledHintInstructionTypesInitialValue,
    );

  const setEnabledHintInstructionType = (
    key: HintInstructionTypes,
    enabled: boolean,
  ) => {
    setEnabledHintInstructionTypes((prev) => {
      if (enabled) {
        return Array.from(new Set([...prev, key]));
      } else {
        return prev.filter((d) => d !== key);
      }
    });
  };

  return (
    <ChatBotSettingContext.Provider
      value={{
        enabledHintInstructionTypes,
        setEnabledHintInstructionTypes,
        setEnabledHintInstructionType,
      }}
    >
      {children}
    </ChatBotSettingContext.Provider>
  );
};

export const useChatBotSettingContext = () => {
  const context = useContext(ChatBotSettingContext);
  if (!context) {
    throw new Error(
      "ChatBotSettingContext must be used within a ChatBotSettingContextProvider",
    );
  }
  return context;
};

export const ChatBotSettingComponent: FC = () => {
  const { enabledHintInstructionTypes, setEnabledHintInstructionTypes } =
    useChatBotSettingContext();

  const empty = "";
  type emptyType = "";
  const [inputs, setInputs] = useState<Array<HintInstructionTypes | emptyType>>(
    enabledHintInstructionTypes,
  );

  useEffect(() => {
    const result = inputs.filter((v) => v !== empty) as HintInstructionTypes[];
    setEnabledHintInstructionTypes(result);
  }, [inputs]);

  return (
    <div className="p-4">
      <p className="text-xl">ChatBot 設定</p>
      <p className="text-lg">利用するヒントの種類</p>
      <ul>
        {inputs.map((hintInstructionType, i) => (
          <li key={i}>
            <div className="flex flex-row">
              <Select
                className="w-96"
                value={hintInstructionType}
                onChange={(e) => {
                  const newValue = e.target.value as HintInstructionTypes;
                  if (!Object.keys(HintInstructions).includes(newValue)) {
                    throw new Error(
                      `value ${newValue} does not exist in HintInstructionTypes`,
                    );
                  }
                  setInputs((prev) => {
                    return Array.from(
                      new Set(prev.map((v, vi) => (vi == i ? newValue : v))),
                    );
                  });
                }}
                placeholder="select"
                fullWidth
              >
                {Object.keys(HintInstructions).map((v, vi) => {
                  return (
                    <MenuItem key={v} value={v}>
                      type {vi + 1}
                    </MenuItem>
                  );
                })}
              </Select>
              <IconButton
                onClick={() => {
                  setInputs((prev) => {
                    return prev.filter((v, vi) => vi !== i);
                  });
                }}
              >
                <DeleteForever className="text-red-500"></DeleteForever>
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
      <IconButton
        color="default"
        onClick={() => {
          setInputs((prev) => {
            return Array.from(new Set([...prev, empty])) as Array<
              HintInstructionTypes | emptyType
            >;
          });
        }}
      >
        <AddCircle />
      </IconButton>
    </div>
  );
};
