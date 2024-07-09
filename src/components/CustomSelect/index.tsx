import { useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import arrow from "../../assets/arrowDown.svg"

interface SelectProps {
  currentItem?: string;
  handleOption?: (item: string) => void;
  options: string[];
}

export const CustomSelect = ({
  options, 
  currentItem = options[0],
  handleOption,
}: SelectProps) => {
  const [currentOption, setCurrentOption] = useState(currentItem);
  const [isOptionsExpanded, setOptionsExpanded] = useState(false); 
  const handleOptionClick = (option: string) => {
    handleOption && handleOption(option);
    setCurrentOption(option);
    setOptionsExpanded(false);
  }

  return (
    <div className="relative">
      {createPortal(
        isOptionsExpanded && (
          <div
            onClick={() => setOptionsExpanded(false)} 
            className="fixed top-0 left-0 w-full h-full z-50">
          </div>
        )
        , document.body)}
      <div
        onClick={() => setOptionsExpanded(state => !state)}
        className="z-[60] relative flex justify-between items-center border-blue-300 cursor-pointer bg-white transition-all duration-300 hover:border-blue-400 border-solid border-[2px] min-h-12 px-4 rounded-md"
      >
        <span className="font-medium">
          {currentOption}
        </span>
        <img
          className={clsx(
            'w-4 h-4 duration-300',
            isOptionsExpanded && 'rotate-180', 
          )} 
          src={arrow} 
          alt="arrow" 
        />
      </div>
      <div
        className={clsx(
          "absolute top-[calc(100%+12px)] left-0 bg-white shadow-[0_0_6px_1px_rgba(0,0,0,.15)] duration-300 transition-all rounded-md w-full z-[60]",
          isOptionsExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-1'
        )}>
        {options.map((optionsItem) => (
          <li
            onClick={() => handleOptionClick(optionsItem)}
            className="px-4 capitalize font-medium duration-300 hover:bg-blue-100 text-black/60 cursor-pointer min-h-10 flex items-center"
          >
            {optionsItem}
          </li>
        ))}
      </div>
    </div>
  )
}