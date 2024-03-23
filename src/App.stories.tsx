import type { Meta, StoryObj } from "@storybook/react";
import { cva, VariantProps } from "class-variance-authority";
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
  FaCheck,
} from "react-icons/fa6";
import { FaBackspace } from "react-icons/fa";
import React, {
  ButtonHTMLAttributes,
  createContext,
  HTMLAttributes,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cn } from "./lib/utils";
import uniq from "lodash/uniq";

enum CalculatorActionType {
  ADD = "ADD",
  MINUS = "MINUS",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  EQUAL = "EQUAL",
  CLEAR = "CLEAR",
  BACKSPACE = "BACKSPACE",
  DIGIT = "DIGIT",
}

interface CalculatorAction {
  type: CalculatorActionType;
  payload: string;
}

const calculate = (result: string) => {
  let checkResult = "";
  if (result.includes("--")) {
    checkResult = result.replace("--", "+");
  } else {
    checkResult = result;
  }
  try {
    checkResult = (eval(checkResult) || "") + "";
  } catch (e) {
    checkResult = "error";
  }
  return checkResult;
};
const calculatorReducer = (result: string, action: CalculatorAction) => {
  switch (action.type) {
    case CalculatorActionType.ADD:
      return result + action.payload;
    case CalculatorActionType.MINUS:
      return result + action.payload;
    case CalculatorActionType.MULTIPLY:
      return result + action.payload;
    case CalculatorActionType.DIVIDE:
      return result + action.payload;
    case CalculatorActionType.EQUAL:
      return calculate(result);
    case CalculatorActionType.CLEAR:
      return action.payload;
    case CalculatorActionType.BACKSPACE:
      return result.slice(0, -1);
    case CalculatorActionType.DIGIT:
      return result + action.payload;
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const CalculatorContext = createContext("");
const CalculatorDispatchContext =
  createContext<React.Dispatch<CalculatorAction> | null>(null);

const CalculatorProvider = ({ children }: PropsWithChildren) => {
  const [result, dispatch] = useReducer(calculatorReducer, "");
  return (
    <CalculatorContext.Provider value={result}>
      <CalculatorDispatchContext.Provider value={dispatch}>
        {children}
      </CalculatorDispatchContext.Provider>
    </CalculatorContext.Provider>
  );
};

const useCalculatorContext = () => useContext(CalculatorContext);
const useCalculatorDispatchContext = () =>
  useContext(CalculatorDispatchContext);

interface Order {
  price: number;
  people: string[];
  amount: number;
}
interface BillModel {
  data: Record<string, Order>[];
  promptpay?: string;
  amount?: number;
}

const bill: BillModel = {
  data: [
    { ข้าวไข่เจียวหมูสับ: { price: 100, people: ["Krit", "Auu"], amount: 50 } },
    {
      ข้าวกะเพราะหมูสับไข่เจียว: {
        price: 120,
        people: ["Krit", "Auu"],
        amount: 60,
      },
    },
  ],
};

const getPeople = () => {
  let people: string[] = [];
  bill.data.forEach((o) => {
    const keys = Object.keys(o);
    if (keys.length > 0) {
      people = people.concat(o[keys[0]].people);
    }
  });
  return uniq(people);
};

const getTotalPrice = () => {
  let total = 0;
  bill.data.forEach((o) => {
    const keys = Object.keys(o);
    if (keys.length > 0) {
      total = total + o[keys[0]].price;
    }
  });
  return total;
};

const getMenu = () => {
  let menu: string[] = [];
  bill.data.forEach((o) => {
    const keys = Object.keys(o);
    if (keys.length > 0) {
      menu = menu.concat(keys[0]);
    }
  });
  return menu;
};

interface MenuDetailItemProps {
  menu: string;
  order: Order;
  setOpenCalculator: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenFoodDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const MenuDetailItem = ({
  setOpenCalculator,
  setOpenFoodDialog,
  menu,
  order,
}: MenuDetailItemProps) => {
  return (
    <div
      className="flex py-3 items-center"
      onClick={() => {
        setOpenCalculator(() => false);
        setOpenFoodDialog(() => true);
      }}
    >
      <div className="w-4/6 text-zinc-600 font-semibold break-words">
        {menu}
        <div className="flex flex-wrap justify-start gap-2">
          {order.people.map((people: string) => {
            return <PeopleBadge key={people}>{people}</PeopleBadge>;
          })}
        </div>
      </div>
      <div className="w-1/6 text-zinc-600 text-xl text-right">
        {order.price}
      </div>
      <div className="w-1/6 text-zinc-500 text-right">{order.amount}</div>
    </div>
  );
};

const ShareBillApp = () => {
  const [openFoodDialog, setOpenFoodDialog] = useState(false);
  const [openPeoplePaymentDialog, setOpenPeoplePaymentDialog] = useState(false);
  const [openCalculator, setOpenCalculator] = useState(false);
  const [people, setPeople] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [menu, setMenu] = useState<string[]>([]);
  const [newMenu, setNewMenu] = useState("");
  useEffect(() => {
    setPeople(() => getPeople());
    setTotalPrice(() => getTotalPrice());
    setMenu(() => getMenu());
  }, []);
  return (
    <>
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ibm-plex-sans-thai-regular overflow-hidden">
        <div className="w-full flex flex-col border px-2 pt-2">
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col">
              <div className="text-xl font-semibold text-zinc-500 ibm-plex-sans-thai-medium">
                จำนวนคน
              </div>
              <div className="text-5xl text-zinc-600 mt-2">{people.length}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-semibold text-zinc-500 ibm-plex-sans-thai-medium">
                ราคารวม
              </div>
              <div className="text-5xl text-zinc-600 mt-2">{totalPrice}</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-zinc-500 ibm-plex-sans-thai-medium">
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
                    "font-semibold text-2xl ibm-plex-sans-thai-medium" +
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
                    "font-semibold text-2xl ibm-plex-sans-thai-medium" +
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
                    {bill.data.map((o) => {
                      const keys = Object.keys(o);
                      if (keys.length > 0) {
                        return (
                          <MenuDetailItem
                            key={keys[0]}
                            menu={keys[0]}
                            order={o[keys[0]]}
                            setOpenCalculator={setOpenCalculator}
                            setOpenFoodDialog={setOpenFoodDialog}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>

                  <div className="flex gap-2 py-4 px-2">
                    <input
                      className="outline-none border-b-2 w-5/6 text-zinc-500"
                      placeholder="ระบุรายการ"
                      onChange={(e) => setNewMenu(() => e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (menu.indexOf(newMenu) > -1) {
                          alert("เมนูนี้มีอยู่แล้ว");
                        } else {
                          setOpenCalculator(() => true);
                          setOpenFoodDialog(() => true);
                        }
                      }}
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
                      <div className="w-4/6 text-lime-600 font-semibold break-words">
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </div>
                      <div className="w-1/6 text-zinc-600 text-xl text-right">
                        50
                      </div>
                      <div className="w-1/6 text-zinc-500 flex justify-end">
                        <button
                          onClick={() => {
                            setOpenPeoplePaymentDialog(() => true);
                          }}
                        >
                          <VscListSelection />
                        </button>
                      </div>
                    </div>
                    <div className="flex py-3 items-center">
                      <div className="w-4/6 text-green-600 font-semibold break-words">
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </div>
                      <div className="w-1/6 text-zinc-600 text-xl text-right">
                        50
                      </div>
                      <div className="w-1/6 text-zinc-500 flex justify-end">
                        <button
                          onClick={() => {
                            setOpenPeoplePaymentDialog(() => true);
                          }}
                        >
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
          <div className="font-semibold text-gray-500 w-16">แชร์บิล</div>
          <input
            type="text"
            className="border border-gray-300 outline-none rounded bg-gray-50 pl-2 pr-10 h-8 w-full"
          />
          <button className="absolute right-4 border-l w-8 flex justify-center py-0 h-8 items-center">
            <FaRegCopy />
          </button>
        </div>
      </div>
      <AddFoodDialog
        openCalculator={openCalculator}
        setOpenFoodDialog={setOpenFoodDialog}
        openFoodDialog={openFoodDialog}
      />
      <AddPeoplePaymentDialog
        openPeoplePaymentDialog={openPeoplePaymentDialog}
        setOpenPeoplePaymentDialog={setOpenPeoplePaymentDialog}
      />
    </>
  );
};

interface AddFoodDialogProps {
  openCalculator: boolean;
  openFoodDialog: boolean;
  setOpenFoodDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFoodDialog = ({
  openCalculator,
  openFoodDialog,
  setOpenFoodDialog,
}: AddFoodDialogProps) => {
  const [showCalculator, setShowCalculator] = useState(openFoodDialog);
  useEffect(() => {
    setShowCalculator(() => openCalculator);
  }, [openCalculator]);
  return (
    <Dialog
      open={openFoodDialog}
      onClose={() => setOpenFoodDialog(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <CalculatorProvider>
        <Dialog.Panel>
          <div
            className={`fixed inset-0 flex flex-col ${showCalculator ? "justify-between" : "justify-center"} w-[424px] h-screen mx-auto`}
          >
            {/* Full-screen container to center the panel */}
            <div className={showCalculator ? "items-start pt-32" : ""}>
              {/* Add Food */}
              <div className="mx-auto rounded bg-white">
                <FoodPanel
                  setIsOpen={setOpenFoodDialog}
                  setShowCalculator={setShowCalculator}
                />
              </div>
            </div>
            <div
              className={`items-end ${showCalculator ? "visible" : "hidden"}`}
            >
              {/* Calculator */}
              <div className="mx-auto rounded bg-white">
                <Calculator setShowCalculator={setShowCalculator} />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </>
    CalculatorProvider</Dialog>
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
  const priceResult = useCalculatorContext();
  return (
    <div className="w-[424px] p-4 ibm-plex-sans-thai-regular">
      <div className="flex flex-col items-center">
        <div className="text-zinc-500">รายการ</div>
        <div className="text-blue-400 text-2xl font-semibold">jjj</div>
        <input
          className="py-4 w-full text-4xl border-b-2 text-center outline-none"
          readOnly
          value={priceResult}
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
        <TogglePeopleButton
          variant={"blue"}
          onToggle={(mark: boolean) => {
            console.log("mark =", mark);
          }}
        >
          jjj
        </TogglePeopleButton>
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
          placeholder="เพิ่มชื่อคนจ่าย"
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
  const dispatch = useCalculatorDispatchContext();
  return (
    <div className="grid grid-rows-5">
      <div className="flex h-12">
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "7" });
          }}
        >
          <div className="font-semibold uppercase">7</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "8" });
          }}
        >
          <div className="font-semibold uppercase">8</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "9" });
          }}
        >
          <div className="font-semibold uppercase">9</div>
        </CalculatorButton>
        <CalculatorButton
          className="bg-zinc-100 w-[88px]"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIVIDE, payload: "/" });
          }}
        >
          <FaDivide />
        </CalculatorButton>
      </div>
      <div className="flex h-12">
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "4" });
          }}
        >
          <div className="font-semibold uppercase">4</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "5" });
          }}
        >
          <div className="font-semibold uppercase">5</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "6" });
          }}
        >
          <div className="font-semibold uppercase">6</div>
        </CalculatorButton>
        <CalculatorButton
          className="bg-zinc-100 w-[88px]"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.MULTIPLY, payload: "*" });
          }}
        >
          <FaX />
        </CalculatorButton>
      </div>
      <div className="flex h-12">
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "1" });
          }}
        >
          <div className="font-semibold uppercase">1</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "2" });
          }}
        >
          <div className="font-semibold uppercase">2</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "3" });
          }}
        >
          <div className="font-semibold uppercase">3</div>
        </CalculatorButton>
        <CalculatorButton
          className="bg-zinc-100 w-[88px]"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.MINUS, payload: "-" });
          }}
        >
          <FaMinus />
        </CalculatorButton>
      </div>
      <div className="flex h-12">
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.CLEAR, payload: "" });
          }}
        >
          <div className="font-semibold uppercase">clear</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "0" });
          }}
        >
          <div className="font-semibold uppercase">0</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-28"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.BACKSPACE, payload: "" });
          }}
        >
          <FaBackspace />
        </CalculatorButton>
        <CalculatorButton
          className="bg-zinc-100 w-[88px]"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.ADD, payload: "+" });
          }}
        >
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
          <div className="font-semibold uppercase">ok</div>
        </CalculatorButton>
        <CalculatorButton className="bg-zinc-200 w-[88px]" onClick={() => {

            dispatch &&
              dispatch({ type: CalculatorActionType.EQUAL, payload: "" });
        }}>
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

interface AddPeoplePaymentDialogProps {
  openPeoplePaymentDialog: boolean;
  setOpenPeoplePaymentDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddPeoplePaymentDialog = ({
  openPeoplePaymentDialog,
  setOpenPeoplePaymentDialog,
}: AddPeoplePaymentDialogProps) => {
  return (
    <Dialog
      open={openPeoplePaymentDialog}
      onClose={() => setOpenPeoplePaymentDialog(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded bg-white">
          <AddPeoplePaymentPanel
            setOpenPeoplePaymentDialog={setOpenPeoplePaymentDialog}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

interface AddPeoplePaymentPanelProps {
  setOpenPeoplePaymentDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPeoplePaymentPanel = ({
  setOpenPeoplePaymentDialog: setOpenAddPeoplePaymentDialog,
}: AddPeoplePaymentPanelProps) => {
  return (
    <div className="w-[424px] p-4 ibm-plex-sans-thai-regular">
      <div className="flex flex-col items-center">
        <div className="text-zinc-500">ยอดชำระ</div>
        <div className="text-blue-400 text-2xl font-semibold">jjjชื่อคน</div>
      </div>

      <div className="flex pt-4 px-2">
        <div className="w-6/12 text-zinc-500">ชื่อรายการ</div>
        <div className="w-3/12 text-zinc-500 text-right">ราคา</div>
        <div className="w-3/12 text-zinc-500 text-right">จ่าย</div>
      </div>
      <div className="grid grid-cols-1 divide-y">
        <div className="flex pt-4 px-2">
          <div className="w-6/12 text-zinc-500">
            <button>
              <div className="flex items-center">
                <FaPlus />
                <div className="text-zinc-600 font-semibold text-2xl ms-2">
                  jj
                </div>
              </div>
            </button>
          </div>
          <div className="w-3/12 text-zinc-500 text-xl text-right">0</div>
          <div className="w-3/12 text-zinc-500 text-2xl text-right">0</div>
        </div>
      </div>
      <div className="flex px-2 pt-4">
        <div className="w-6/12 font-semibold text-2xl">ยอดรวม</div>
        <div className="w-6/12 text-right font-semibold text-2xl">0</div>
      </div>

      <button
        onClick={() => {
          setOpenAddPeoplePaymentDialog(() => false);
        }}
        type="button"
        className="text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-8 py-2.5 mt-4 grow w-full"
      >
        ตกลง
      </button>
    </div>
  );
};

const toggleSpanVariants = cva(
  `inline-flex items-center px-2 py-1 me-2 text-sm font-medium rounded `,
  {
    variants: {
      variant: {
        blue: "text-blue-800 bg-blue-100",
        dark: "text-dark-800 bg-dark-100",
        red: "text-red-800 bg-red-100",
        green: "text-green-800 bg-green-100",
        yellow: "text-yellow-800 bg-yellow-100",
        indigo: "text-indigo-800 bg-indigo-100",
        purple: "text-purple-800 bg-purple-100",
        pink: "text-pink-800 bg-pink-100",
        disabled: "text-gray-800 bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "disabled",
    },
  }
);

const toggleButtonVariants = cva(
  `inline-flex items-center p-1 ms-2 text-sm bg-transparent rounded-sm`,
  {
    variants: {
      variant: {
        blue: "text-blue-400 hover:bg-blue-200 hover:text-blue-900",
        dark: "text-dark-400 hover:bg-dark-200 hover:text-dark-900",
        red: "text-red-400 hover:bg-red-200 hover:text-red-900",
        green: "text-green-400 hover:bg-green-200 hover:text-green-900",
        yellow: "text-yellow-400 hover:bg-yellow-200 hover:text-yellow-900",
        indigo: "text-indigo-400 hover:bg-indigo-200 hover:text-indigo-900",
        pink: "text-pink-400 hover:bg-pink-200 hover:text-pink-900",
        purple: "text-purple-400 hover:bg-purple-200 hover:text-purple-900",
        disabled: "text-gray-400 hover:bg-gray-200 hover:text-gray-900",
      },
    },
    defaultVariants: {
      variant: "disabled",
    },
  }
);

interface TogglePeopleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleSpanVariants>,
    VariantProps<typeof toggleButtonVariants> {
  onToggle: (mark: boolean) => void;
}

const TogglePeopleButton = ({
  children,
  variant,
  onToggle,
}: TogglePeopleButtonProps) => {
  const [mark, setMark] = useState(false);
  return (
    <span
      className={cn(
        toggleSpanVariants({ variant: mark ? variant : "disabled" })
      )}
    >
      {mark ? <FaCheck /> : <FaPlus />}
      <button
        className={cn(
          toggleButtonVariants({ variant: mark ? variant : "disabled" })
        )}
        onClick={() => {
          onToggle(mark);
          setMark((o) => !o);
        }}
      >
        {children}
      </button>
    </span>
  );
};

const peopleBadgeVariants = cva(
  `text-xs font-medium me-2 px-2.5 py-0.5 rounded`,
  {
    variants: {
      variant: {
        blue: "bg-blue-100 text-blue-800",
        dark: "bg-dark-100 text-dark-800",
        red: "bg-red-100 text-red-800",
        green: "bg-green-100 text-green-800",
        yellow: "bg-yellow-100 text-yellow-800",
        indigo: "bg-indigo-100 text-indigo-800",
        pink: "bg-pink-100 text-pink-800",
        purple: "bg-purple-100 text-purple-800",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

interface PeopleBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof peopleBadgeVariants> {}

const PeopleBadge = ({ variant, children }: PeopleBadgeProps) => {
  return (
    <span className={cn(peopleBadgeVariants({ variant }))}>{children}</span>
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
      </>
    );
  },
};
