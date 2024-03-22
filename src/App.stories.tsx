import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "@headlessui/react";
import { VscListSelection } from "react-icons/vsc";
import { MdPeopleAlt } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";

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
          <Tab.Group defaultIndex={1}>
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
                <div className="flex flex-col px-2 pt-2">
                  <div className="flex my-4">
                    <div className="w-4/6 text-zinc-500">ชื่อรายการ</div>
                    <div className="w-1/6 text-zinc-500 text-right">ราคา</div>
                    <div className="w-1/6 text-zinc-500 text-right">คนละ</div>
                  </div>
                  <div className="flex my-3">
                    <div className="w-4/6 text-zinc-600 font-bold break-words">
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      <div className="flex flex-wrap gap-2">
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
                  <div className="flex items-center gap-2 my-4">
                    <input
                      className="outline-none border-b-2 w-5/6 text-zinc-500"
                      placeholder="ระบุรายการ"
                    />
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow"
                    >
                      เพิ่ม
                    </button>
                  </div>
                  <div className="flex w-full justify-between flex-wrap items-center my-4">
                    <button className="text-red-500 my-4 flex grow">
                      ล้างรายการทั้งหมด
                    </button>
                    <input
                      type="text"
                      className="outline-none border-b-2 leading-4 h-4"
                      placeholder="เบอร์โทรศัพท์ Promptpay"
                    />
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex flex-col px-2 pt-2">
                  <div className="flex my-4">
                    <div className="w-4/6 text-zinc-500">ชื่อคน</div>
                    <div className="w-1/6 text-zinc-500 text-right">จ่าย</div>
                    <div className="w-1/6 text-zinc-500 text-right">&nbsp;</div>
                  </div>
                  <div className="flex my-3">
                    <div className="w-4/6 text-zinc-600 font-bold break-words">
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </div>
                    <div className="w-1/6 text-zinc-600 text-xl text-right">
                      50
                    </div>
                    <div className="w-1/6 text-zinc-500 flex justify-end">
                      <VscListSelection />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 my-4">
                    <input
                      className="outline-none border-b-2 w-5/6 text-zinc-500"
                      placeholder="ระบุรายการ"
                    />
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 grow"
                    >
                      เพิ่ม
                    </button>
                  </div>
                  <div className="flex w-full justify-between flex-wrap items-center my-4">
                    <button className="text-red-500 my-4 flex grow">
                      ล้างรายชื่อทั้งหมด
                    </button>
                    <input
                      type="text"
                      className="outline-none border-b-2 leading-4 h-4"
                      placeholder="เบอร์โทรศัพท์ Promptpay"
                    />
                  </div>
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

const meta: Meta<typeof ShareBillApp> = {
  component: ShareBillApp,
};

export default meta;
type Story = StoryObj<typeof ShareBillApp>;

export const FirstStory: Story = {
  args: {},
};
