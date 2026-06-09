import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { initialProducts } from "@/lib/data"
import { ChartNoAxesColumn } from "lucide-react"
import { useState } from "react"
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts"

const managerData = {
  today: {
    income: "20,000FCFA",
    balance: "30,000 FCFA",
    totalIncome: "4,500 FCFA",
    totalExpense: "2,500 FCFA",
    incomeIncrease: "+20%",
    expenseIncrease: "+30%",

    salesData: [
      { sales: 15000 },
      { sales: 14000 },
      { sales: 14800 },
      { sales: 13000 },
      { sales: 14500 },
      { sales: 13800 },
      { sales: 14500 },
      { sales: 15300 },
      { sales: 13800 },
    ],

    incomeData: [
      { name: "Cold Drink", value: 35 },
      { name: "Others", value: 25 },
      { name: "Foodies", value: 50 },
    ],
    ordersMultiplier: 1,
  },

  week: {
    income: "40,000FCFA",
    balance: "50,000 FCFA",
    totalIncome: "6,500 FCFA",
    totalExpense: "3,500 FCFA",
    incomeIncrease: "+30%",
    expenseIncrease: "+40%",

    salesData: [
      { sales: 5000 },
      { sales: 9000 },
      { sales: 9000 },
      { sales: 10000 },
      { sales: 13000 },
      { sales: 13000 },
      { sales: 12800 },
      { sales: 15200 },
      { sales: 13800 },
      { sales: 15200 },
      { sales: 12800 },
    ],

    incomeData: [
      { name: "Cold Drink", value: 30 },
      { name: "Others", value: 10 },
      { name: "Foodies", value: 50 },
    ],

    ordersMultiplier: 3,
  },

  month: {
    income: "60,000FCFA",
    balance: "90,000 FCFA",
    totalIncome: "24,500 FCFA",
    totalExpense: "22,500 FCFA",
    incomeIncrease: "+40%",
    expenseIncrease: "+50%",

    salesData: [
      { sales: 10000 },
      { sales: 5000 },
      { sales: 9000 },
      { sales: 16000 },
      { sales: 12000 },
      { sales: 13000 },
      { sales: 15200 },
      { sales: 12000 },
      { sales: 14000 },
      { sales: 13000 },
      { sales: 15000 },
      { sales: 20000 },
    ],

    incomeData: [
      { name: "Cold Drink", value: 20 },
      { name: "Others", value: 40 },
      { name: "Foodies", value: 20 },
    ],
    ordersMultiplier: 5,
  },

  year: {
    income: "80,000FCFA",
    balance: "1,20,000 FCFA",
    totalIncome: "45,500 FCFA",
    totalExpense: "65,500 FCFA",
    incomeIncrease: "+50%",
    expenseIncrease: "+60%",

    salesData: [
      { sales: 20000 },
      { sales: 15000 },
      { sales: 15000 },
      { sales: 12000 },
      { sales: 13000 },
      { sales: 15200 },
      { sales: 13000 },
      { sales: 15200 },
      { sales: 10000 },
    ],

    incomeData: [
      { name: "Cold Drink", value: 50 },
      { name: "Others", value: 30 },
      { name: "Foodies", value: 30 },
    ],
    ordersMultiplier: 10,
  },
}

const COLORS = ["#000000", "#E5E7EB", "#F97316"]

export default function Manager() {
  const [period, setPeriod] = useState("today")
  const currentData = managerData[period as keyof typeof managerData]

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-[#1F2937]">
          Manager Dashboard (teste)
        </h1>

        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList className="h-12 rounded-xl bg-white p-1 shadow-sm">
            <TabsTrigger value="today" className="rounded-lg px-5">
              Today
            </TabsTrigger>

            <TabsTrigger value="week" className="rounded-lg px-5">
              This Week
            </TabsTrigger>

            <TabsTrigger value="month" className="rounded-lg px-5">
              This Month
            </TabsTrigger>

            <TabsTrigger value="year" className="rounded-lg px-5">
              This Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* TOP GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* TOTAL INCOME */}
        <Card className="rounded-3xl border-0 ">
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-bold">Total Income</h2>

            <div className="relative flex justify-center">
              <PieChart width={220} height={220}>
                <Pie
                  data={currentData.incomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={82}
                  startAngle={180}
                  endAngle={-270}                
                  dataKey="value"
                >
                  {currentData.incomeData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>

              <div className="absolute top-[82px] text-center">
                <h2 className="text-xl font-bold">{currentData.income}</h2>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-5 rounded-full bg-primary" />
                Foodies
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-5 rounded-full bg-black" />
                Cold Drink
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-5 rounded-full bg-gray-300" />
                Others
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TOTAL BALANCE */}
        <Card className="rounded-3xl border-0 ">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">Total Balance</h2>

            <h1 className="mt-5 text-center text-4xl font-bold text-green-500">
              {currentData.balance}
            </h1>

            <div className="mt-10 flex justify-between">
              {/* Income */}
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-black p-3">
                 <ChartNoAxesColumn strokeWidth={1.5} size={16} className="bg-white" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Income</p>

                  <h3 className="font-bold">{currentData.totalIncome}</h3>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                ({currentData.incomeIncrease} Increase)
              </p>
            </div>

            <div className="mt-6 flex justify-between">
              {/* Expense */}
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary p-3">
                  <div className="h-4 w-4 rounded-sm bg-white" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Expense</p>

                  <h3 className="font-bold">{currentData.totalExpense}</h3>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                ({currentData.expenseIncrease} Increase)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BOTTOM GRID */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* DAILY SELLING */}
        <Card className="rounded-3xl border-0 shadow-sm lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-bold">Daily Selling</h2>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={currentData.salesData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 10,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#F97316" stopOpacity={0.2} />

                      <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  {/* traits horizontaux */}
                  <CartesianGrid
                    vertical={false}
                    stroke="#E5E7EB"
                    strokeDasharray="3 3"
                  />

                  <YAxis
                    domain={[5000, 20000]}
                    ticks={[5000, 10000, 15000, 20000]}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                    tick={{
                      fill: "#9CA3AF",
                      fontSize: 12,
                    }}
                  />

                  <XAxis hide />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#F97316"
                    strokeWidth={2}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* BEST DISHES */}
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Best Dishes</h2>

              <span className="text-sm text-gray-400">Orders</span>
            </div>

            <div className="space-y-5">
              {initialProducts.slice(0, 4).map((item) => (
                <div
                  key={item.productid}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productname}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{item.productname}</h3>

                      <p className="text-sm text-primary">{item.price}FCFA</p>
                    </div>
                  </div>

                  <span className="font-semibold">
                    {item.quantity * currentData.ordersMultiplier}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
