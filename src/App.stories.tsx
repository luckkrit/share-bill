import type { Meta, StoryObj } from "@storybook/react";
import { Tab, Dialog } from "@headlessui/react";
import { VscListSelection } from "react-icons/vsc";
import { MdPeopleAlt } from "react-icons/md";
import {
  FaRegCopy,
  FaDivide,
  FaPlus,
  FaMinus,
  FaX,
  FaEquals,
} from "react-icons/fa6";
import { FaBackspace } from "react-icons/fa";
import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  useState,
} from "react";
import { cn } from "./lib/utils";

const ShareBillApp = () => {
  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ibm-plex-sans-thai-regular overflow-hidden">
      <div className="w-full flex flex-col border px-2 pt-2">
        <div className="grid grid-cols-3 w-full">
          <div className="flex flex-col">
            <div className="text-xl font-bold text-zinc-500 ibm-plex-sans-thai-medium">
              จำนวนคน
            </div>
            <div className="text-5xl text-zinc-600 mt-2">2</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold text-zinc-500 ibm-plex-sans-thai-medium">
              ราคารวม
            </div>
            <div className="text-5xl text-zinc-600 mt-2">50</div>
          </div>
          <div>
            <div className="text-xl font-bold text-zinc-500 ibm-plex-sans-thai-medium">
              จ่ายเงิน
            </div>
            <img
              src="https://promptpay.io/0891671761/222.png"
              className="w-16"
            ></img>
          </div>
        </div>
        <div className="w-full mt-6">
          <Tab.Group defaultIndex={0}>
            <Tab.List className={"w-full grid grid-cols-2 "}>
              <Tab
                key={"1"}
                className={({ selected }) =>
                  "font-bold text-2xl ibm-plex-sans-thai-medium" +
                  (selected
                    ? " text-blue-500 border-b-blue-500 border-b-2"
                    : " text-zinc-500 border-b-2")
                }
              >
                <div className="flex gap-2 items-center justify-center">
                  <VscListSelection />
                  <div>รายการ</div>
                </div>
              </Tab>
              <Tab
                key={"2"}
                className={({ selected }) =>
                  "font-bold text-2xl ibm-plex-sans-thai-medium" +
                  (selected
                    ? " text-blue-500 border-b-blue-500 border-b-2"
                    : " text-zinc-500 border-b-2")
                }
              >
                <div className="flex gap-2 items-center justify-center">
                  <MdPeopleAlt />
                  <div>คนจ่าย</div>
                </div>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex pt-4 px-2">
                  <div className="w-4/6 text-zinc-500">ชื่อรายการ</div>
                  <div className="w-1/6 text-zinc-500 text-right">ราคา</div>
                  <div className="w-1/6 text-zinc-500 text-right">คนละ</div>
                </div>
                <div className="grid grid-cols-1 divide-y px-2">
                  <div className="flex py-3 items-center">
                    <div className="w-4/6 text-zinc-600 font-bold break-words">
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      <div className="flex flex-wrap justify-start gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          Default
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                          Dark
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          Red
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Green
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Yellow
                        </span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                          Indigo
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                          Purple
                        </span>
                        <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                          Pink
                        </span>
                      </div>
                    </div>
                    <div className="w-1/6 text-zinc-600 text-xl text-right">
                      50
                    </div>
                    <div className="w-1/6 text-zinc-500 text-right">25</div>
                  </div>
                  <div className="flex py-3 items-center">
                    <div className="w-4/6 text-zinc-600 font-bold break-words">
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      <div className="flex flex-wrap justify-start gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          Default
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                          Dark
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          Red
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Green
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Yellow
                        </span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                          Indigo
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                          Purple
                        </span>
                        <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                          Pink
                        </span>
                      </div>
                    </div>
                    <div className="w-1/6 text-zinc-600 text-xl text-right">
                      50
                    </div>
                    <div className="w-1/6 text-zinc-500 text-right">25</div>
                  </div>
                  <div className="flex py-3 items-center">
                    <div className="w-4/6 text-zinc-600 font-bold break-words">
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      <div className="flex flex-wrap justify-start gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          Default
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                          Dark
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          Red
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Green
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Yellow
                        </span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                          Indigo
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                          Purple
                        </span>
                        <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                          Pink
                        </span>
                      </div>
                    </div>
                    <div className="w-1/6 text-zinc-600 text-xl text-right">
                      50
                    </div>
                    <div className="w-1/6 text-zinc-500 text-right">25</div>
                  </div>
                </div>

                <div className="flex gap-2 py-4 px-2">
                  <input
                    className="outline-none border-b-2 w-5/6 text-zinc-500"
                    placeholder="ระบุรายการ"
                  />
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow"
                  >
                    เพิ่ม
                  </button>
                </div>
                <div className="flex w-full justify-between flex-wrap items-center py-4 px-2">
                  <button className="text-red-500 my-4 flex grow">
                    ล้างรายการทั้งหมด
                  </button>
                  <input
                    type="text"
                    className="outline-none border-b-2 leading-4 h-4"
                    placeholder="เบอร์โทรศัพท์ Promptpay"
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex pt-4 px-2 items-center">
                  <div className="w-4/6 text-zinc-500">ชื่อคน</div>
                  <div className="w-1/6 text-zinc-500 text-right">จ่าย</div>
                  <div className="w-1/6 text-zinc-500 text-right">&nbsp;</div>
                </div>
                <div className="grid grid-cols-1 divide-y px-2">
                  <div className="flex py-3 items-center">
                    <div className="w-4/6 text-zinc-600 font-bold break-words">
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </div>
                    <div className="w-1/6 text-zinc-600 text-xl text-right">
                      50
                    </div>
                    <div className="w-1/6 text-zinc-500 flex justify-end">
                      <button>
                        <VscListSelection />
                      </button>
                    </div>
                  </div>
                  <div className="flex py-3 items-center">
                    <div className="w-4/6 text-zinc-600 font-bold break-words">
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </div>
                    <div className="w-1/6 text-zinc-600 text-xl text-right">
                      50
                    </div>
                    <div className="w-1/6 text-zinc-500 flex justify-end">
                      <button>
                        <VscListSelection />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 py-4 px-2">
                  <input
                    className="outline-none border-b-2 w-5/6 text-zinc-500"
                    placeholder="ระบุชื่อ"
                  />
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow"
                  >
                    เพิ่ม
                  </button>
                </div>

                <div className="flex w-full justify-between flex-wrap items-center py-4 px-2">
                  <button className="text-red-500 my-4 flex grow">
                    ล้างรายชื่อทั้งหมด
                  </button>
                  <input
                    type="text"
                    className="outline-none border-b-2 leading-4 h-4"
                    placeholder="เบอร์โทรศัพท์ Promptpay"
                  />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full bg-slate-100 p-4 relative">
        <div className="font-bold text-gray-500 w-16">แชร์บิล</div>
        <input
          type="text"
          className="border border-gray-300 outline-none rounded bg-gray-50 pl-2 pr-10 h-8 w-full"
        />
        <button className="absolute right-4 border-l w-8 flex justify-center py-0 h-8 items-center">
          <FaRegCopy />
        </button>
      </div>
    </div>
  );
};

const AddFoodDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showCalculator, setShowCalculator] = useState(true);

  return (
    <Dialog
      static={isOpen}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div
        className={`fixed inset-0 flex flex-col ${showCalculator ? "justify-between" : "justify-center"} w-[424px] h-screen mx-auto`}
      >
        {/* Full-screen container to center the panel */}
        <div className={showCalculator ? "items-start pt-32" : ""}>
          {/* Add Food */}
          <Dialog.Panel className="mx-auto rounded bg-white">
            <FoodPanel
              setIsOpen={setIsOpen}
              setShowCalculator={setShowCalculator}
            />
          </Dialog.Panel>
        </div>
        <div className={`items-end ${showCalculator ? "visible" : "hidden"}`}>
          {/* Calculator */}
          <Dialog.Panel className="mx-auto rounded bg-white">
            <Calculator setShowCalculator={setShowCalculator} />
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

interface FoodPanelProps extends HTMLAttributes<HTMLDivElement> {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCalculator: React.Dispatch<React.SetStateAction<boolean>>;
}
const FoodPanel = ({
  setIsOpen,
  setShowCalculator,
}: PropsWithChildren<FoodPanelProps>) => {
  return (
    <div className="w-[424px] p-4 ibm-plex-sans-thai-regular">
      <div className="flex flex-col items-center">
        <div className="text-zinc-500">รายการ</div>
        <div className="text-blue-400 text-2xl font-bold">jjj</div>
        <input
          className="py-4 w-full text-4xl border-b-2 text-center outline-none"
          readOnly
          value={25}
          onClick={() => {
            setShowCalculator(() => true);
          }}
        />
      </div>
      <div className="py-4 text-zinc-500 flex items-center">
        <MdPeopleAlt />
        <div className="ps-2">คนจ่าย (0 คน คนละ 0 บาท)</div>
      </div>
      <div className="flex justify-start flex-wrap gap-2">
        <span
          id="badge-dismiss-default"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
        >
          Default
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
            data-dismiss-target="#badge-dismiss-default"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
        <span
          id="badge-dismiss-dark"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
        >
          Dark
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
            data-dismiss-target="#badge-dismiss-dark"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
        <span
          id="badge-dismiss-red"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300"
        >
          Red
          <button
            type="button"
            className="inline-flex items-center p-1  ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
            data-dismiss-target="#badge-dismiss-red"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
        <span
          id="badge-dismiss-green"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300"
        >
          Green
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
            data-dismiss-target="#badge-dismiss-green"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
        <span
          id="badge-dismiss-yellow"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300"
        >
          Yellow
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-yellow-400 bg-transparent rounded-sm hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300"
            data-dismiss-target="#badge-dismiss-yellow"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
        <span
          id="badge-dismiss-indigo"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300"
        >
          Indigo
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300"
            data-dismiss-target="#badge-dismiss-indigo"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
        <span
          id="badge-dismiss-purple"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300"
        >
          Purple
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300"
            data-dismiss-target="#badge-dismiss-purple"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
        <span
          id="badge-dismiss-pink"
          className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-pink-800 bg-pink-100 rounded dark:bg-pink-900 dark:text-pink-300"
        >
          Pink
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-pink-400 bg-transparent rounded-sm hover:bg-pink-200 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-300"
            data-dismiss-target="#badge-dismiss-pink"
            aria-label="Remove"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
      </div>
      <button
        type="button"
        className="my-4 py-2.5 px-5 text-sm font-medium text-blue-500 focus:outline-none bg-white rounded-lg border border-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 w-full"
      >
        <div className="flex items-center justify-center">
          <FaPlus />
          <div className="ps-2">เลือกทุกคน</div>
        </div>
      </button>
      <div className="flex w-full">
        <input
          type="text"
          className="outline-none border-b border-b-gray-300 w-full"
        />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 ms-2 grow"
        >
          เพิ่ม
        </button>
      </div>
      <button
        onClick={() => {
          setIsOpen(() => false);
        }}
        type="button"
        className="text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-8 py-2.5 my-4 grow w-full"
      >
        ตกลง
      </button>
    </div>
  );
};

interface CalculatorProps extends HTMLAttributes<HTMLDivElement> {
  setShowCalculator: React.Dispatch<React.SetStateAction<boolean>>;
}
const Calculator = ({
  setShowCalculator,
}: PropsWithChildren<CalculatorProps>) => {
  return (
    <div className="grid grid-rows-5">
      <div className="flex h-12">
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">7</div>
        </CalculatorButton>
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">8</div>
        </CalculatorButton>
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">9</div>
        </CalculatorButton>
        <CalculatorButton className="bg-zinc-100 w-[88px]" onClick={() => {}}>
          <FaDivide />
        </CalculatorButton>
      </div>
      <div className="flex h-12">
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">4</div>
        </CalculatorButton>
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">5</div>
        </CalculatorButton>
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">6</div>
        </CalculatorButton>
        <CalculatorButton className="bg-zinc-100 w-[88px]" onClick={() => {}}>
          <FaX />
        </CalculatorButton>
      </div>
      <div className="flex h-12">
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">1</div>
        </CalculatorButton>
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">2</div>
        </CalculatorButton>
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">3</div>
        </CalculatorButton>
        <CalculatorButton className="bg-zinc-100 w-[88px]" onClick={() => {}}>
          <FaMinus />
        </CalculatorButton>
      </div>
      <div className="flex h-12">
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">clear</div>
        </CalculatorButton>
        <CalculatorButton className="w-28" onClick={() => {}}>
          <div className="font-bold uppercase">0</div>
        </CalculatorButton>
        <CalculatorButton className="w-28" onClick={() => {}}>
          <FaBackspace />
        </CalculatorButton>
        <CalculatorButton className="bg-zinc-100 w-[88px]" onClick={() => {}}>
          <FaPlus />
        </CalculatorButton>
      </div>
      <div className="flex h-12">
        <CalculatorButton
          className="w-[336px] bg-lime-300"
          onClick={() => {
            setShowCalculator(() => false);
          }}
        >
          <div className="font-bold uppercase">ok</div>
        </CalculatorButton>
        <CalculatorButton className="bg-zinc-200 w-[88px]" onClick={() => {}}>
          <FaEquals />
        </CalculatorButton>
      </div>
    </div>
  );
};
interface CalculatorButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}
const CalculatorButton = ({
  onClick,
  className,
  children,
  ...props
}: PropsWithChildren<CalculatorButtonProps>) => {
  return (
    <button
      className={cn(
        "outline-none flex justify-center items-center text-center",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const meta: Meta<typeof ShareBillApp> = {
  component: ShareBillApp,
};

export default meta;
type Story = StoryObj<typeof ShareBillApp>;

export const MainApp: Story = {
  args: {},
};

export const AddFoodModal: Story = {
  render: () => {
    return (
      <>
        <ShareBillApp />
        <AddFoodDialog />
      </>
    );
  },
};
