"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { PoundSterling } from "lucide-react";
import { useState } from "react";

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [mortgageTerm, setMortgageTerm] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [fixedRepayment, setFixedRepayment] = useState(true);
  const [interestOnly, setInterestOnly] = useState(false);
  const [totalRepayment, setTotalRepayment] = useState(0);

  const calculatePayment = (e) => {
    e.preventDefault();

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(mortgageTerm) * 12;

    let payment = 0;
    let total = 0;
    if (interestOnly) {
      payment = principal * rate;
      total = payment * payments + principal;
    } else if (fixedRepayment) {
      payment =
        (principal * rate * Math.pow(1 + rate, payments)) /
          Math.pow(1 + rate, payments) -
        1;
      total = payments * payments;
    }

    setMonthlyPayment(payment.toFixed(2));
    setTotalRepayment(total.toFixed(2));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 text-white">
      <div className="grid w-full max-w-4xl rounded-3xl bg-white shadow-md md:grid-cols-2">
        <div className="p-6">
          <h2 className="mb-6 text-xl font-bold text-teal-900">
            Mortgage Calculator
          </h2>

          <form className="space-y-6" onSubmit={calculatePayment}>
            <div>
              <Label className="mb-2 block text-sm font-bold text-teal-800">
                Mortgage Amount
              </Label>
              <div className="relative">
                <div className="absolute flex h-9 w-8 items-center justify-center rounded-l-lg bg-teal-400/25">
                  <PoundSterling className="size-5 text-teal-900" />
                </div>
                <Input
                  type="number"
                  placeholder="Mortgage amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="pl-10 text-teal-800 placeholder-teal-700"
                />
              </div>
            </div>

            <article className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block text-sm font-bold text-teal-800">
                  Mortgage Term
                </Label>
                <div className="relative">
                  <div className="absolute right-0 flex h-full w-14 items-center justify-center rounded-r-lg bg-teal-400/25 text-sm text-teal-900">
                    <p>years</p>
                  </div>
                  <Input
                    type="number"
                    placeholder="Mortgage term"
                    value={mortgageTerm}
                    onChange={(e) => setMortgageTerm(e.target.value)}
                    className="pr-16 text-teal-800 placeholder-teal-700"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-bold text-teal-800">
                  Interest Rate
                </Label>
                <div className="relative">
                  <div className="absolute right-0 flex h-full w-14 items-center justify-center rounded-r-lg bg-teal-400/25 text-sm text-teal-900">
                    <p>%</p>
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Interest rate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="pr-16 text-teal-800 placeholder-teal-700"
                  />
                </div>
              </div>
            </article>

            <div className="space-y-2">
              <p className="text-sm text-teal-900">Mortgage type</p>
              <Label
                htmlFor="fixed-repayment"
                className={`flex cursor-pointer items-center gap-2 rounded border p-2 text-teal-900 ${fixedRepayment && "border-teal-700 bg-teal-400/50 transition"}`}
              >
                <Input
                  type="checkbox"
                  id="fixed-repayment"
                  checked={fixedRepayment}
                  onChange={() => {
                    setFixedRepayment(!fixedRepayment);
                    setInterestOnly(false);
                  }}
                  className="size-6"
                />
                <span>Fixed repayment</span>
              </Label>

              <Label
                htmlFor="interest-only"
                className={`flex cursor-pointer items-center gap-2 rounded border p-2 text-teal-900 ${interestOnly && "border-teal-700 bg-teal-400/50 transition"}`}
              >
                <Input
                  type="checkbox"
                  id="interest-only"
                  checked={interestOnly}
                  onChange={() => {
                    setInterestOnly(!interestOnly);
                    setFixedRepayment(false);
                  }}
                  className="size-6"
                />
                <span>Interest Only</span>
              </Label>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full rounded-full bg-[#dad830] text-gray-900 hover:bg-[#dad830]/75"
            >
              <Calculator /> Calculate Repayments
            </Button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl rounded-t-none bg-gray-800 p-6 text-center lg:rounded-tl-none lg:rounded-tr-3xl lg:rounded-bl-[50px]">
          {monthlyPayment ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Your results</h3>

              <p className="text-sm leading-6 text-white/75">
                Your results are shown based on the information you provided. To
                adjust the results, edit the form and click &quot;Calculate
                Repayments&quot; again.
              </p>

              <div className="rounded-lg border-t-4 border-[#dad830] bg-gray-900 p-6 text-left lg:text-center">
                <div className="mb-4 border-b border-gray-700 pb-4">
                  <p className="mb-2 text-sm text-white/75">
                    Your monthly repayments
                  </p>
                  <p className="text-4xl font-bold text-[#dad830]">
                    {formatCurrency(monthlyPayment)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-white/75">
                    Total you&apos;ll repay over the term
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(totalRepayment)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold text-white">
                Results shown here
              </h3>
              <p className="text-sm leading-6 text-white/75">
                Complete the form and click &quot;Calculate Repayments&quot; to
                see what your monthly repayments would be.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
