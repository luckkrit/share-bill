import "./App.css";

import { cva, VariantProps } from "class-variance-authority";
import { Tab, Dialog } from "@headlessui/react";
import { VscDiffAdded, VscListSelection } from "react-icons/vsc";
import { MdPeopleAlt } from "react-icons/md";
import {
  FaRegCopy,
  FaDivide,
  FaPlus,
  FaMinus,
  FaX,
  FaEquals,
  FaCheck,
  FaTrash,
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
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  useFloating,
  useInteractions,
  autoPlacement,
} from "@floating-ui/react";

enum ShareBillDialogType {
  ADD_FOOD = "ADD_FOOD",
  UPDATE_FOOD = "UPDATE_FOOD",
  CLOSE = "CLOSE",
  SHOW_CALCULATOR = "SHOW_CALCULATOR",
  HIDE_CALCULATOR = "HIDE_CALCULATOR",
  UPDATE_PAYMENT = "UPDATE_PAYMENT",
  SHARE_MENU = "SHARE_MENU",
  SHARE_PEOPLE = "SHARE_PEOPLE",
}

interface ShareBillDialogAction {
  type: ShareBillDialogType;
  payload: ShareBillDialogState;
}

interface ShareBillDialogState {
  openFoodDialog: boolean;
  openCalculatorDialog: boolean;
  openPaymentDialog: boolean;
  newMenu: string;
  peopleName: string;
}

const ShareBillDialogReducer = (
  state: ShareBillDialogState,
  action: ShareBillDialogAction
) => {
  switch (action.type) {
    case ShareBillDialogType.ADD_FOOD:
      console.log("add food");
      return { ...state, ...action.payload };
    case ShareBillDialogType.UPDATE_FOOD:
      return { ...state, ...action.payload };
    case ShareBillDialogType.CLOSE:
      return { ...state, ...action.payload };
    case ShareBillDialogType.SHOW_CALCULATOR:
      return { ...state, ...action.payload };
    case ShareBillDialogType.HIDE_CALCULATOR:
      return { ...state, ...action.payload };
    case ShareBillDialogType.UPDATE_PAYMENT:
      return { ...state, ...action.payload };
    case ShareBillDialogType.SHARE_MENU:
      return { ...state, ...action.payload };
    case ShareBillDialogType.SHARE_PEOPLE:
      return { ...state, ...action.payload };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const ShareBillDialogContext = createContext({
  openFoodDialog: false,
  openCalculatorDialog: false,
  openPaymentDialog: false,
  newMenu: "",
  peopleName: "",
});

const ShareBillDialogDispatchContext =
  createContext<React.Dispatch<ShareBillDialogAction> | null>(null);

const ShareBillDialogProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(ShareBillDialogReducer, {
    openFoodDialog: false,
    openCalculatorDialog: false,
    openPaymentDialog: false,
    newMenu: "",
    peopleName: "",
  });
  return (
    <ShareBillDialogContext.Provider value={state}>
      <ShareBillDialogDispatchContext.Provider value={dispatch}>
        {children}
      </ShareBillDialogDispatchContext.Provider>
    </ShareBillDialogContext.Provider>
  );
};

const useShareBillDialogContext = () => useContext(ShareBillDialogContext);
const useShareBillDialogDispatchContext = () =>
  useContext(ShareBillDialogDispatchContext);

enum BillActionType {
  ADD_FOOD = "ADD_FOOD",
  DELETE_FOOD = "DELETE_FOOD",
  ADD_PEOPLE = "ADD_PEOPLE",
  DELETE_PEOPLE = "DELETE_PEOPLE",
  UPDATE_FOOD_PRICE = "ADD_FOOD_PRICE",
  ADD_ALL_PEOPLE = "ADD_ALL_PEOPLE",
  CLEAR_FOOD = "CLEAR_FOOD",
  CLEAR_ALL_PEOPLE = "CLEAR_ALL_PEOPLE",
  ADD_PROMPTPAY = "ADD_PROMPTPAY",
  DELETE_PEOPLE_ONLY = "DELETE_PEOPLE_ONLY",
}

interface BillAction {
  type: BillActionType;
}

interface AddFoodAction extends BillAction {
  foodName: string;
  price: number;
}

interface DeleteFoodAction extends BillAction {
  foodName: string;
}

interface AddPeopleAction extends BillAction {
  foodName: string;
  peopleName: string;
}

interface UpdateFoodPriceAction extends BillAction {
  foodName: string;
  price: number;
}

interface DeletePeopleAction extends BillAction {
  foodName: string;
  peopleName: string;
}
interface AddAllPeopleAction extends BillAction {
  peopleName: string;
  badgeColor: string;
}
interface AddPromptPayAction extends BillAction {
  phone: string;
}
interface DeletePeopleOnlyAction extends BillAction {
  peopleName: string;
}

const billReducer = (billModel: BillModel, action: BillAction) => {
  switch (action.type) {
    case BillActionType.ADD_FOOD:
      const addFoodAction: AddFoodAction = action as AddFoodAction;
      const bill: Record<string, Order> = {};
      bill[addFoodAction.foodName] = {
        price: addFoodAction.price,
        people: [],
        amount: 0,
      };
      return { ...billModel, data: [...billModel.data, bill] };
    case BillActionType.DELETE_FOOD:
      const deleteFoodAction: DeleteFoodAction = action as DeleteFoodAction;
      const updateBills = billModel.data.filter((b) => {
        const keys = Object.keys(b);
        if (keys[0] !== deleteFoodAction.foodName) {
          return b;
        }
      });
      return { ...billModel, data: [...updateBills] };
    case BillActionType.ADD_PEOPLE:
      const addPeopleAction: AddPeopleAction = action as AddPeopleAction;
      billModel.data.forEach((o) => {
        const keys = Object.keys(o);
        if (keys[0] === addPeopleAction.foodName) {
          if (o[keys[0]].people.indexOf(addPeopleAction.peopleName) === -1) {
            o[keys[0]].people.push(addPeopleAction.peopleName);
            if (o[keys[0]].people.length > 0) {
              o[keys[0]].amount = Math.ceil(
                o[keys[0]].price / o[keys[0]].people.length
              );
            } else {
              o[keys[0]].amount = 0;
            }
            console.log(o[keys[0]].amount);
          }
        }
      });
      return {
        ...billModel,
        data: [...billModel.data],
      };
    case BillActionType.UPDATE_FOOD_PRICE:
      const updateFoodPriceAction: UpdateFoodPriceAction =
        action as UpdateFoodPriceAction;
      billModel.data.forEach((o) => {
        const keys = Object.keys(o);
        if (keys[0] === updateFoodPriceAction.foodName) {
          o[keys[0]].price = updateFoodPriceAction.price;

          if (o[keys[0]].people.length > 0) {
            o[keys[0]].amount = Math.ceil(
              o[keys[0]].price / o[keys[0]].people.length
            );
          } else {
            o[keys[0]].amount = 0;
          }
          console.log(o[keys[0]].amount);
        }
      });
      return { ...billModel, data: [...billModel.data] };
    case BillActionType.DELETE_PEOPLE:
      const deletePeopleAction: DeletePeopleAction =
        action as DeletePeopleAction;
      billModel.data.forEach((o) => {
        const keys = Object.keys(o);
        if (keys[0] === deletePeopleAction.foodName) {
          o[keys[0]].people = o[keys[0]].people.filter((p) => {
            if (p !== deletePeopleAction.peopleName) {
              return p;
            }
          });
          if (o[keys[0]].people.length > 0) {
            o[keys[0]].amount = Math.ceil(
              o[keys[0]].price / o[keys[0]].people.length
            );
          } else {
            o[keys[0]].amount = 0;
          }
          console.log(o[keys[0]].amount);
        }
      });
      return { ...billModel, data: [...billModel.data] };
    case BillActionType.ADD_ALL_PEOPLE:
      const addAllPeopleAction: AddAllPeopleAction =
        action as AddAllPeopleAction;
      return {
        ...billModel,
        allPeople: uniq([
          ...billModel.allPeople,
          {
            peopleName: addAllPeopleAction.peopleName,
            badgeColor: addAllPeopleAction.badgeColor,
          },
        ]),
      };
    case BillActionType.CLEAR_FOOD:
      return { ...billModel, data: [] };
    case BillActionType.CLEAR_ALL_PEOPLE:
      billModel.data.forEach((o) => {
        const keys = Object.keys(o);
        o[keys[0]].people = [];
        if (o[keys[0]].people.length > 0) {
          o[keys[0]].amount = Math.ceil(
            o[keys[0]].price / o[keys[0]].people.length
          );
        } else {
          o[keys[0]].amount = 0;
        }
        console.log(o[keys[0]].amount);
      });
      return { ...billModel, data: [...billModel.data], allPeople: [] };
    case BillActionType.ADD_PROMPTPAY:
      const addPromptpayAction: AddPromptPayAction =
        action as AddPromptPayAction;
      return { ...billModel, promptpay: addPromptpayAction.phone };
    case BillActionType.DELETE_PEOPLE_ONLY:
      const deletePeopleOnlyAction: DeletePeopleOnlyAction =
        action as DeletePeopleOnlyAction;
      billModel.data.forEach((o) => {
        const keys = Object.keys(o);
        o[keys[0]].people = o[keys[0]].people.filter((p) => {
          if (p !== deletePeopleOnlyAction.peopleName) {
            return p;
          }
        });
        if (o[keys[0]].people.length > 0) {
          o[keys[0]].amount = Math.ceil(
            o[keys[0]].price / o[keys[0]].people.length
          );
        } else {
          o[keys[0]].amount = 0;
        }
        console.log(o[keys[0]].amount);
      });
      billModel.allPeople = billModel.allPeople.filter((p) => {
        if (p.peopleName !== deletePeopleOnlyAction.peopleName) {
          return p;
        }
      });
      return {
        ...billModel,
        data: [...billModel.data],
        allPeople: [...billModel.allPeople],
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const BillContext = createContext<BillModel>({
  data: [],
  promptpay: "",
  amount: 0,
  allPeople: [],
});
const BillDispatchContext = createContext<React.Dispatch<BillAction> | null>(
  null
);

const BillProvider = ({ children }: PropsWithChildren) => {
  const query = new URLSearchParams(window.location.search);
  const bill = query.get("bill");
  let billObject =
    bill !== null
      ? JSON.parse(bill)
      : {
          data: [],
          promptpay: "",
          amount: 0,
          allPeople: [],
        };
  billObject = { ...billObject, allPeople: [] };
  const [billModel, dispatch] = useReducer(billReducer, billObject);
  return (
    <BillContext.Provider value={billModel}>
      <BillDispatchContext.Provider value={dispatch}>
        {children}
      </BillDispatchContext.Provider>
    </BillContext.Provider>
  );
};
const useBillContext = () => useContext(BillContext);
const useBillDispatchContext = () => useContext(BillDispatchContext);

enum CalculatorActionType {
  ADD = "ADD",
  MINUS = "MINUS",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  EQUAL = "EQUAL",
  CLEAR = "CLEAR",
  BACKSPACE = "BACKSPACE",
  DIGIT = "DIGIT",
  SET_RESULT = "SET_RESULT",
}

interface CalculatorAction {
  type: CalculatorActionType;
  payload: string;
}

const calculate = (result: string) => {
  let checkResult = result;
  if (result.includes("--")) {
    checkResult = result.replace("--", "+");
  }
  if (result.includes("÷")) {
    checkResult = result.replace("÷", "/");
  }
  if (result.includes("x")) {
    checkResult = result.replace("x", "*");
  }
  if (result.includes("=")) {
    checkResult = result.replace("=", "");
  }
  try {
    checkResult = (eval(checkResult) || "") + "";
    checkResult = Math.ceil(Number(checkResult)).toString();
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
    case CalculatorActionType.SET_RESULT:
      return action.payload;
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
interface People {
  peopleName: string;
  badgeColor: string;
}
type BillModel = {
  data: Record<string, Order>[];
  promptpay?: string;
  amount?: number;
  allPeople: People[];
};

type ExportBill = Omit<BillModel, "allPeople">;

const getPeople = (bills: Record<string, Order>[]) => {
  let people: string[] = [];
  bills.forEach((o) => {
    const keys = Object.keys(o);
    if (keys.length > 0) {
      people = people.concat(o[keys[0]].people);
    }
  });
  return uniq(people);
};

const checkPeopleFromFood = (
  bills: Record<string, Order>[],
  foodName: string,
  peopleName: string
) => {
  let isCheck = false;
  bills.forEach((o) => {
    const keys = Object.keys(o);
    if (keys[0] === foodName && o[keys[0]].people.indexOf(peopleName) > -1) {
      isCheck = true;
    }
  });
  return isCheck;
};
const getPeopleFromFood = (
  bills: Record<string, Order>[],
  foodName: string
) => {
  let people: string[] = [];
  bills.forEach((o) => {
    const keys = Object.keys(o);
    if (keys[0] === foodName) {
      people = people.concat(o[keys[0]].people);
    }
  });
  return uniq(people);
};

const getAmountFromFood = (
  bills: Record<string, Order>[],
  foodName: string
) => {
  let amount = 0;
  bills.forEach((o) => {
    const keys = Object.keys(o);
    if (keys[0] === foodName) {
      amount = o[keys[0]].amount;
    }
  });
  return amount;
};

const getAmountFromPeople = (
  bills: Record<string, Order>[],
  peopleName: string
) => {
  let amount = 0;
  bills.forEach((o) => {
    const keys = Object.keys(o);
    if (o[keys[0]].people.indexOf(peopleName) > -1) {
      amount += o[keys[0]].amount;
    }
  });
  return amount;
};

const getTotalPrice = (bills: Record<string, Order>[]) => {
  let total = 0;
  bills.forEach((o) => {
    const keys = Object.keys(o);
    if (keys.length > 0) {
      total = total + o[keys[0]].price;
    }
  });
  return total;
};

const getMenu = (bills: Record<string, Order>[]) => {
  let menu: string[] = [];
  bills.forEach((o) => {
    const keys = Object.keys(o);
    if (keys.length > 0) {
      menu = menu.concat(keys[0]);
    }
  });
  return menu;
};
const getMenuPrice = (bills: Record<string, Order>[], foodName: string) => {
  let price = 0;
  bills.forEach((o) => {
    const keys = Object.keys(o);
    if (keys[0] === foodName) {
      price = o[keys[0]].price;
    }
  });
  return price;
};
const getColor = (i: number) => {
  const colors: string[] = [
    "blue",
    "dark",
    "red",
    "green",
    "yellow",
    "indigo",
    "purple",
    "pink",
  ];
  const color = colors[i % colors.length];
  if (color === "blue") return "blue";
  else if (color === "dark") return "dark";
  else if (color === "red") return "red";
  else if (color === "green") return "green";
  else if (color === "yellow") return "yellow";
  else if (color === "indigo") return "indigo";
  else if (color === "purple") return "purple";
  else return "pink";
};

const getColorName = (
  color: string
):
  | "blue"
  | "dark"
  | "red"
  | "green"
  | "yellow"
  | "indigo"
  | "purple"
  | "pink"
  | null
  | undefined => {
  if (color === "blue") return "blue";
  else if (color === "dark") return "dark";
  else if (color === "red") return "red";
  else if (color === "green") return "green";
  else if (color === "yellow") return "yellow";
  else if (color === "indigo") return "indigo";
  else if (color === "purple") return "purple";
  else return "pink";
};

const peopleDetailItemVariants = cva(
  `w-5/12 font-semibold break-words text-left`,
  {
    variants: {
      variant: {
        blue: "text-blue-400",
        dark: "text-gray-400",
        red: "text-red-400",
        green: "text-green-400",
        yellow: "text-yellow-400",
        indigo: "text-indigo-400",
        pink: "text-pink-400",
        purple: "text-purple-400",
      },
    },
  }
);
interface PeopleDetailItemProps
  extends VariantProps<typeof peopleDetailItemVariants> {
  people: People;
  bills: Record<string, Order>[];
}
const PeopleDetailItem = ({
  bills,
  people,
  variant,
}: PeopleDetailItemProps) => {
  const { newMenu } = useShareBillDialogContext();
  const dialogDispatch = useShareBillDialogDispatchContext();
  const dispatch = useBillDispatchContext();
  const [paid, setPaid] = useState(false);
  return (
    <div className="flex py-3 items-center">
      <button
        className={cn(peopleDetailItemVariants({ variant }))}
        onClick={() => {
          setPaid((o) => !o);
        }}
      >
        {people.peopleName}{" "}
        {paid ? (
          <span className="text-xs bg-green-100 text-green-800 font-medium me-2 px-2.5 py-0.5 rounded">
            จ่ายแล้ว
          </span>
        ) : null}
      </button>
      <div className="w-3/12 text-zinc-600 text-xl text-right">
        {getAmountFromPeople(bills, people.peopleName)}
      </div>
      <div className="w-2/12 text-zinc-500 flex justify-end">
        <button
          onClick={() => {
            dialogDispatch &&
              dialogDispatch({
                type: ShareBillDialogType.UPDATE_PAYMENT,
                payload: {
                  openCalculatorDialog: false,
                  openFoodDialog: false,
                  openPaymentDialog: true,
                  newMenu,
                  peopleName: people.peopleName,
                },
              });
          }}
        >
          <VscListSelection />
        </button>
      </div>
      <div className="w-2/12 text-red-500 flex justify-end">
        <button
          onClick={() => {
            const deletePeopleOnlyAction: DeletePeopleOnlyAction = {
              type: BillActionType.DELETE_PEOPLE_ONLY,
              peopleName: people.peopleName,
            };
            dispatch && dispatch(deletePeopleOnlyAction);
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

interface MenuDetailItemProps {
  menu: string;
  order: Order;
  // setNewMenu: React.Dispatch<React.SetStateAction<string>>;
  allPeople: People[];
}
const MenuDetailItem = ({
  menu,
  order,
  // setNewMenu,
  allPeople,
}: MenuDetailItemProps) => {
  console.log(order);
  const { peopleName } = useShareBillDialogContext();
  const dispatch = useBillDispatchContext();
  const dialogDispatch = useShareBillDialogDispatchContext();
  return (
    <div className="flex py-3 items-center">
      <div
        className="w-3/6 text-zinc-600 font-semibold break-words cursor-pointer"
        onClick={() => {
          dialogDispatch &&
            dialogDispatch({
              type: ShareBillDialogType.UPDATE_FOOD,
              payload: {
                openCalculatorDialog: false,
                openFoodDialog: true,
                openPaymentDialog: false,
                newMenu: menu,
                peopleName,
              },
            });
          // setNewMenu(() => menu);
        }}
      >
        {menu}
        <div className="flex flex-wrap justify-start gap-2">
          {order.people.map((people: string) => {
            const p = allPeople.find((o) => o.peopleName === people);
            if (p !== undefined) {
              return (
                <PeopleBadge key={people} variant={getColorName(p.badgeColor)}>
                  {people}
                </PeopleBadge>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="w-1/6 text-zinc-600 text-xl text-right">
        {order.price}
      </div>
      <div className="w-1/6 text-zinc-500 text-right">{order.amount}</div>
      <div className="w-1/6 text-red-500 flex justify-center">
        <button
          onClick={() => {
            const deleteFoodAction: DeleteFoodAction = {
              type: BillActionType.DELETE_FOOD,
              foodName: menu,
            };
            dispatch && dispatch(deleteFoodAction);
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

const ShareBillApp = () => {
  // const [peopleName, setPeopleName] = useState("");
  // const [newMenu, setNewMenu] = useState("");
  const { newMenu, peopleName, ...state } = useShareBillDialogContext();
  const billModel = useBillContext();
  const dispatch = useBillDispatchContext();
  const dialogDispatch = useShareBillDialogDispatchContext();
  const exportBill: ExportBill = {
    data: billModel.data,
    promptpay: billModel.promptpay,
  };
  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?bill=${encodeURI(JSON.stringify(exportBill))}`;

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [autoPlacement()],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([]);
  // console.log(url);
  // const [phone, setPhone] = useState("");
  return (
    <>
      <div className="max-w-sm mx-auto ibm-plex-sans-thai-regular overflow-hidden">
        <div className="w-full flex flex-col border px-2 pt-2">
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col">
              <div className="text-xl font-semibold text-zinc-500 ibm-plex-sans-thai-medium">
                จำนวนคน
              </div>
              <div className="text-5xl text-zinc-600 mt-2">
                {getPeople(billModel.data).length}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-semibold text-zinc-500 ibm-plex-sans-thai-medium">
                ราคารวม
              </div>
              <div className="text-5xl text-zinc-600 mt-2">
                {getTotalPrice(billModel.data)}
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="text-xl font-semibold text-zinc-500 ibm-plex-sans-thai-medium">
                {billModel.promptpay !== undefined &&
                billModel.promptpay.length === 10
                  ? billModel.promptpay
                  : "QR Code"}
              </div>
              <button
                className="mt-2"
                onClick={() => {
                  let phone = prompt("ใส่เบอร์ Promptpay", "08xxxxxxxx");
                  if (phone !== null) {
                    let isnum = /^\d+$/.test(phone);
                    if (isnum && phone.trim().length === 10) {
                      const addPromptPayAction: AddPromptPayAction = {
                        type: BillActionType.ADD_PROMPTPAY,
                        phone,
                      };
                      dispatch && dispatch(addPromptPayAction);
                    } else {
                      alert("กรุณากรอกเบอร์โทรศัพท์ 10 หลัก");
                    }
                  } else {
                    alert("กรุณากรอกเบอร์โทรศัพท์ 10 หลัก");
                  }
                }}
              >
                {billModel.promptpay !== undefined &&
                billModel.promptpay.length === 10 ? (
                  <img
                    src={`https://promptpay.io/${billModel.promptpay}.png`}
                    className="w-16"
                    onError={() => {
                      const addPromptPayAction: AddPromptPayAction = {
                        type: BillActionType.ADD_PROMPTPAY,
                        phone: "",
                      };
                      dispatch && dispatch(addPromptPayAction);
                    }}
                  ></img>
                ) : (
                  <VscDiffAdded className="w-10 h-10" />
                )}
              </button>
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
                    <div className="w-3/6 text-zinc-500">ชื่อรายการ</div>
                    <div className="w-1/6 text-zinc-500 text-right">ราคา</div>
                    <div className="w-1/6 text-zinc-500 text-right">คนละ</div>
                    <div className="w-1/6 text-zinc-500 text-right"></div>
                  </div>
                  <div className="grid grid-cols-1 divide-y px-2">
                    {billModel.data.map((o) => {
                      const keys = Object.keys(o);
                      if (keys.length > 0) {
                        return (
                          <MenuDetailItem
                            key={keys[0]}
                            menu={keys[0]}
                            order={o[keys[0]]}
                            allPeople={billModel.allPeople}
                            // setNewMenu={setNewMenu}
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
                      onChange={(e) => {
                        dialogDispatch &&
                          dialogDispatch({
                            type: ShareBillDialogType.SHARE_MENU,
                            payload: {
                              ...state,
                              newMenu: e.target.value,
                              peopleName,
                            },
                          });
                      }}
                      value={newMenu}
                      // defaultValue={newMenu}
                    />
                    <button
                      onClick={() => {
                        if (getMenu(billModel.data).indexOf(newMenu) > -1) {
                          alert("เมนูนี้มีอยู่แล้ว");
                        } else if (newMenu.trim().length > 0) {
                          const billAction: AddFoodAction = {
                            type: BillActionType.ADD_FOOD,
                            foodName: newMenu,
                            price: 0,
                          };
                          dispatch && dispatch(billAction);
                          dialogDispatch &&
                            dialogDispatch({
                              type: ShareBillDialogType.ADD_FOOD,
                              payload: {
                                openFoodDialog: true,
                                openCalculatorDialog: true,
                                openPaymentDialog: false,
                                newMenu,
                                peopleName: "",
                              },
                            });
                        }
                      }}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none  grow"
                    >
                      เพิ่ม
                    </button>
                  </div>
                  <div className="flex w-full justify-between flex-wrap items-center py-4 px-2">
                    <button
                      className="text-red-500 my-4 flex grow"
                      onClick={() => {
                        dispatch &&
                          dispatch({ type: BillActionType.CLEAR_FOOD });
                      }}
                    >
                      ล้างรายการทั้งหมด
                    </button>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="flex pt-4 px-2 items-center">
                    <div className="w-5/12 text-zinc-500">ชื่อคน</div>
                    <div className="w-3/12 text-zinc-500 text-right">จ่าย</div>
                    <div className="w-2/12 text-zinc-500 text-right">
                      &nbsp;
                    </div>
                    <div className="w-2/12 text-zinc-500 text-right">
                      &nbsp;
                    </div>
                  </div>
                  <div className="grid grid-cols-1 divide-y px-2">
                    {billModel.allPeople.map((people) => (
                      <PeopleDetailItem
                        key={people.peopleName}
                        people={people}
                        bills={billModel.data}
                        variant={getColorName(people.badgeColor)}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2 py-4 px-2">
                    <input
                      className="outline-none border-b-2 w-5/6 text-zinc-500"
                      placeholder="ระบุชื่อ"
                      onChange={(e) => {
                        dialogDispatch &&
                          dialogDispatch({
                            type: ShareBillDialogType.SHARE_PEOPLE,
                            payload: {
                              ...state,
                              newMenu,
                              peopleName: e.target.value,
                            },
                          });
                      }}
                      value={peopleName}
                    />
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none grow"
                      onClick={() => {
                        if (
                          billModel.allPeople.find(
                            (p) => p.peopleName === peopleName
                          ) !== undefined
                        ) {
                          alert("ชื่อคนซ้ำกัน");
                        } else if (peopleName.trim().length > 0) {
                          const addAllPeopleAction: AddAllPeopleAction = {
                            type: BillActionType.ADD_ALL_PEOPLE,
                            peopleName,
                            badgeColor: getColor(billModel.allPeople.length),
                          };
                          dispatch && dispatch(addAllPeopleAction);
                          dialogDispatch &&
                            dialogDispatch({
                              type: ShareBillDialogType.SHARE_PEOPLE,
                              payload: {
                                ...state,
                                newMenu,
                                peopleName: "",
                              },
                            });
                        }
                      }}
                    >
                      เพิ่ม
                    </button>
                  </div>

                  <div className="flex w-full justify-between flex-wrap items-center py-4 px-2">
                    <button
                      className="text-red-500 my-4 flex grow"
                      onClick={() => {
                        dispatch &&
                          dispatch({ type: BillActionType.CLEAR_ALL_PEOPLE });
                      }}
                    >
                      ล้างรายชื่อทั้งหมด
                    </button>
                    {/* <input
                      type="text"
                      className="outline-none border-b-2 leading-4 h-4"
                      placeholder="เบอร์โทรศัพท์ Promptpay"
                    /> */}
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
            defaultValue={url}
          />
          <CopyToClipboard
            text={url}
            onCopy={(_, result) => {
              if (result) {
                setIsOpen(() => true);
                setTimeout(() => {
                  setIsOpen(() => false);
                }, 3000);
              }
            }}
          >
            <button
              className="absolute right-4 border-l w-8 flex justify-center py-0 h-8 items-center"
              ref={refs.setReference}
              {...getReferenceProps()}
            >
              <FaRegCopy />
            </button>
          </CopyToClipboard>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="bg-white text-gray-800 p-2 border rounded shadow-md"
            >
              Copied!
            </div>
          )}
        </div>
      </div>
      <AddFoodDialog />
      <AddPeoplePaymentDialog />
    </>
  );
};

interface AddFoodDialogProps {
  // newMenu: string;
  // setNewMenu: React.Dispatch<React.SetStateAction<string>>;
}
const AddFoodDialog = ({}: AddFoodDialogProps) => {
  const dialogDispatch = useShareBillDialogDispatchContext();
  const { openFoodDialog, openCalculatorDialog, peopleName } =
    useShareBillDialogContext();
  // useEffect(() => {
  //   if (!openFoodDialog) {
  //     setNewMenu(() => "");
  //   }
  // }, [openFoodDialog]);
  return (
    <CalculatorProvider>
      <Dialog
        open={openFoodDialog}
        onClose={() => {
          dialogDispatch &&
            dialogDispatch({
              type: ShareBillDialogType.CLOSE,
              payload: {
                openCalculatorDialog: false,
                openFoodDialog: false,
                openPaymentDialog: false,
                newMenu: "",
                peopleName,
              },
            });
        }}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <Dialog.Panel>
          <div
            className={`fixed inset-0 flex flex-col ${openCalculatorDialog ? "justify-evenly" : "justify-center"} max-w-sm h-screen mx-auto`}
          >
            {/* Full-screen container to center the panel */}
            <div className={openCalculatorDialog ? "" : ""}>
              {/* Add Food */}
              <div className="mx-auto rounded bg-white">
                <FoodPanel />
              </div>
            </div>
            <div className={` ${openCalculatorDialog ? "visible" : "hidden"}`}>
              {/* Calculator */}
              <div className="mx-auto rounded bg-white">
                <Calculator />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </CalculatorProvider>
  );
};

interface FoodPanelProps extends HTMLAttributes<HTMLDivElement> {
  // newMenu: string;
}
const FoodPanel = ({}: PropsWithChildren<FoodPanelProps>) => {
  const [peopleName, setPeopleName] = useState("");
  const priceResult = useCalculatorContext();
  const billModel = useBillContext();
  const dispatch = useBillDispatchContext();
  const calDispatch = useCalculatorDispatchContext();
  const dialogDispatch = useShareBillDialogDispatchContext();
  const { newMenu } = useShareBillDialogContext();
  useEffect(() => {
    const menuPrice = getMenuPrice(billModel.data, newMenu);
    if (menuPrice !== 0) {
      calDispatch &&
        calDispatch({
          type: CalculatorActionType.SET_RESULT,
          payload: menuPrice.toString(),
        });
    }
  }, []);
  useEffect(() => {
    const updateFoodPriceAction: UpdateFoodPriceAction = {
      type: BillActionType.UPDATE_FOOD_PRICE,
      foodName: newMenu,
      price: Number(priceResult),
    };
    dispatch && dispatch(updateFoodPriceAction);
  }, [priceResult]);
  return (
    <div className="w-full p-2 ibm-plex-sans-thai-regular">
      <div className="flex flex-col items-center">
        <div className="text-zinc-500">รายการ</div>
        <div className="text-blue-400 text-2xl font-semibold">{newMenu}</div>
        <input
          className="py-2 w-full text-4xl border-b-2 text-center outline-none"
          readOnly
          value={priceResult}
          onClick={() => {
            dialogDispatch &&
              dialogDispatch({
                type: ShareBillDialogType.SHOW_CALCULATOR,
                payload: {
                  openCalculatorDialog: true,
                  openFoodDialog: true,
                  openPaymentDialog: false,
                  newMenu,
                  peopleName: "",
                },
              });
          }}
        />
      </div>
      <div className="py-4 text-zinc-500 flex items-center">
        <MdPeopleAlt />
        <div className="ps-2">
          คนจ่าย ({getPeopleFromFood(billModel.data, newMenu).length} คน คนละ{" "}
          {getAmountFromFood(billModel.data, newMenu)} บาท)
        </div>
      </div>
      <div className="flex justify-start flex-wrap gap-2">
        {billModel.allPeople.map((p, i) => {
          console.log(
            "is mark ",
            getPeopleFromFood(billModel.data, newMenu).indexOf(p.peopleName) >
              -1
          );
          return (
            <TogglePeopleButton
              key={i}
              isMark={
                getPeopleFromFood(billModel.data, newMenu).indexOf(
                  p.peopleName
                ) > -1
              }
              variant={getColorName(p.badgeColor)}
              onToggle={(mark: boolean) => {
                if (mark) {
                  const addPeopleAction: AddPeopleAction = {
                    type: BillActionType.ADD_PEOPLE,
                    foodName: newMenu,
                    peopleName: p.peopleName,
                  };
                  dispatch && dispatch(addPeopleAction);
                } else {
                  const deletePeopleAction: DeletePeopleAction = {
                    type: BillActionType.DELETE_PEOPLE,
                    foodName: newMenu,
                    peopleName: p.peopleName,
                  };
                  dispatch && dispatch(deletePeopleAction);
                }
              }}
            >
              {p.peopleName}
            </TogglePeopleButton>
          );
        })}
      </div>
      <button
        type="button"
        className="my-4 py-2.5 px-5 text-sm font-medium text-blue-500 focus:outline-none bg-white rounded-lg border border-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 w-full"
        onClick={() => {
          billModel.allPeople.map((p) => {
            const addPeopleAction: AddPeopleAction = {
              type: BillActionType.ADD_PEOPLE,
              foodName: newMenu,
              peopleName: p.peopleName,
            };
            dispatch && dispatch(addPeopleAction);
          });
        }}
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
          onChange={(e) => setPeopleName(e.target.value)}
          value={peopleName}
        />
        <button
          onClick={() => {
            if (
              billModel.allPeople.find((p) => p.peopleName === peopleName) !==
              undefined
            ) {
              alert("ชื่อคนซ้ำกัน");
            } else if (peopleName.trim().length > 0) {
              const addAllPeopleAction: AddAllPeopleAction = {
                type: BillActionType.ADD_ALL_PEOPLE,
                peopleName,
                badgeColor: getColor(billModel.allPeople.length),
              };
              dispatch && dispatch(addAllPeopleAction);
              setPeopleName(() => "");
            }
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 ms-2 grow"
        >
          เพิ่ม
        </button>
      </div>
      <button
        onClick={() => {
          dialogDispatch &&
            dialogDispatch({
              type: ShareBillDialogType.CLOSE,
              payload: {
                openCalculatorDialog: false,
                openFoodDialog: false,
                openPaymentDialog: false,
                newMenu: "",
                peopleName: "",
              },
            });
          calDispatch &&
            calDispatch({ type: CalculatorActionType.CLEAR, payload: "" });
        }}
        type="button"
        className="text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-8 py-2.5 my-2 grow w-full"
      >
        ตกลง
      </button>
    </div>
  );
};

interface CalculatorProps extends HTMLAttributes<HTMLDivElement> {}
const Calculator = ({}: PropsWithChildren<CalculatorProps>) => {
  const dispatch = useCalculatorDispatchContext();
  const dialogDispatch = useShareBillDialogDispatchContext();
  const { newMenu, peopleName } = useShareBillDialogContext();
  return (
    <div className="grid grid-rows-5">
      <div className="flex justify-evenly h-12">
        <CalculatorButton
          className="w-1/4"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "7" });
          }}
        >
          <div className="font-semibold uppercase">7</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-1/4"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "8" });
          }}
        >
          <div className="font-semibold uppercase">8</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-1/4"
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
              dispatch({ type: CalculatorActionType.DIVIDE, payload: "÷" });
          }}
        >
          <FaDivide />
        </CalculatorButton>
      </div>
      <div className="flex justify-evenly h-12">
        <CalculatorButton
          className="w-1/4"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "4" });
          }}
        >
          <div className="font-semibold uppercase">4</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-1/4"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "5" });
          }}
        >
          <div className="font-semibold uppercase">5</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-1/4"
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
              dispatch({ type: CalculatorActionType.MULTIPLY, payload: "x" });
          }}
        >
          <FaX />
        </CalculatorButton>
      </div>
      <div className="flex justify-evenly h-12">
        <CalculatorButton
          className="w-1/4"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "1" });
          }}
        >
          <div className="font-semibold uppercase">1</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-1/4"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "2" });
          }}
        >
          <div className="font-semibold uppercase">2</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-1/4"
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
      <div className="flex justify-evenly h-12">
        <CalculatorButton
          className="w-1/4"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.CLEAR, payload: "" });
          }}
        >
          <div className="font-semibold uppercase">clear</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-1/4"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.DIGIT, payload: "0" });
          }}
        >
          <div className="font-semibold uppercase">0</div>
        </CalculatorButton>
        <CalculatorButton
          className="w-1/4"
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
      <div className="flex justify-evenly h-12">
        <CalculatorButton
          className="grow bg-lime-300"
          onClick={() => {
            dialogDispatch &&
              dialogDispatch({
                type: ShareBillDialogType.HIDE_CALCULATOR,
                payload: {
                  openCalculatorDialog: false,
                  openFoodDialog: true,
                  openPaymentDialog: false,
                  newMenu,
                  peopleName,
                },
              });
          }}
        >
          <div className="font-semibold uppercase">ok</div>
        </CalculatorButton>
        <CalculatorButton
          className="bg-zinc-200 w-[88px]"
          onClick={() => {
            dispatch &&
              dispatch({ type: CalculatorActionType.EQUAL, payload: "=" });
          }}
        >
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

interface MenuPaymentDetailsProps {
  peopleName: string;
  menu: string;
  order: Order;
}
const MenuPaymentDetails = ({
  peopleName,
  menu,
  order,
}: MenuPaymentDetailsProps) => {
  const billModel = useBillContext();
  const dispatch = useBillDispatchContext();
  const [isMark, setIsMark] = useState(
    checkPeopleFromFood(billModel.data, menu, peopleName)
  );
  return (
    <div className="flex pt-4 px-2">
      <div className={"w-6/12 " + (isMark ? "text-blue-500" : "text-zinc-500")}>
        <button
          onClick={() => {
            // Add this people to this menu
            if (!isMark) {
              const addPeopleAction: AddPeopleAction = {
                type: BillActionType.ADD_PEOPLE,
                foodName: menu,
                peopleName: peopleName,
              };
              dispatch && dispatch(addPeopleAction);
            } else {
              const deletePeopleAction: DeletePeopleAction = {
                type: BillActionType.DELETE_PEOPLE,
                foodName: menu,
                peopleName: peopleName,
              };
              dispatch && dispatch(deletePeopleAction);
            }
            setIsMark((o) => !o);
          }}
        >
          <div className="flex items-center">
            {isMark ? <FaCheck /> : <FaPlus />}
            <div
              className={
                "font-semibold text-2xl ms-2 " +
                (isMark ? "text-blue-600" : "text-zinc-600")
              }
            >
              {menu}
            </div>
          </div>
        </button>
      </div>
      <div className="w-3/12 text-zinc-500 text-xl text-right">
        {order.price}
      </div>
      <div className="w-3/12 text-zinc-500 text-2xl text-right">
        {isMark ? order.amount : 0}
      </div>
    </div>
  );
};

interface AddPeoplePaymentDialogProps {}
const AddPeoplePaymentDialog = ({}: AddPeoplePaymentDialogProps) => {
  const billModel = useBillContext();
  const { openPaymentDialog, peopleName, ...state } =
    useShareBillDialogContext();
  const dialogDispatch = useShareBillDialogDispatchContext();
  return (
    <Dialog
      open={openPaymentDialog}
      onClose={() => {
        dialogDispatch &&
          dialogDispatch({
            type: ShareBillDialogType.CLOSE,
            payload: {
              ...state,
              openCalculatorDialog: false,
              openFoodDialog: false,
              openPaymentDialog: false,
              peopleName: "",
            },
          });
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm w-full rounded bg-white">
          <div className="w-full p-4 ibm-plex-sans-thai-regular">
            <div className="flex flex-col items-center">
              <div className="text-zinc-500">ยอดชำระ</div>
              <div className="text-blue-400 text-2xl font-semibold">
                {peopleName}
              </div>
            </div>

            <div className="flex pt-4 px-2">
              <div className="w-6/12 text-zinc-500">ชื่อรายการ</div>
              <div className="w-3/12 text-zinc-500 text-right">ราคา</div>
              <div className="w-3/12 text-zinc-500 text-right">จ่าย</div>
            </div>
            <div className="grid grid-cols-1 divide-y">
              {billModel.data.map((o) => {
                const keys = Object.keys(o);
                return (
                  <MenuPaymentDetails
                    key={keys[0]}
                    menu={keys[0]}
                    peopleName={peopleName}
                    order={o[keys[0]]}
                  />
                );
              })}
            </div>
            <div className="flex px-2 pt-4">
              <div className="w-6/12 font-semibold text-2xl">ยอดรวม</div>
              <div className="w-6/12 text-right font-semibold text-2xl">
                {getAmountFromPeople(billModel.data, peopleName)}
              </div>
            </div>

            <button
              onClick={() => {
                // setOpenAddPeoplePaymentDialog(() => false);
                dialogDispatch &&
                  dialogDispatch({
                    type: ShareBillDialogType.CLOSE,
                    payload: {
                      ...state,
                      openCalculatorDialog: false,
                      openFoodDialog: false,
                      openPaymentDialog: false,
                      peopleName: "",
                    },
                  });
              }}
              type="button"
              className="text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-8 py-2.5 mt-4 grow w-full"
            >
              ตกลง
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const toggleSpanVariants = cva(
  `inline-flex items-center px-2 py-1 me-2 text-sm font-medium rounded `,
  {
    variants: {
      variant: {
        blue: "text-blue-800 bg-blue-100",
        dark: "text-gray-800 bg-gray-100",
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
        dark: "text-gray-400 hover:bg-gray-200 hover:text-gray-900",
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
  isMark: boolean;
}

const TogglePeopleButton = ({
  isMark,
  children,
  variant,
  onToggle,
}: TogglePeopleButtonProps) => {
  const [mark, setMark] = useState(isMark);
  useEffect(() => {
    setMark(() => isMark);
  }, [isMark]);
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
          setMark((o) => !o);
          onToggle(!mark);
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
        dark: "bg-gray-100 text-gray-800",
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

function App() {
  return (
    <ShareBillDialogProvider>
      <BillProvider>
        <ShareBillApp />
      </BillProvider>
    </ShareBillDialogProvider>
  );
}

export default App;
