import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Calculator, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface AffordabilityResult {
  maxRent: number;
  maxPurchase: number;
  monthlyMortgage: number;
  recommended: 'rent' | 'buy' | 'both';
  canAfford: boolean;
}

export function AffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [savings, setSavings] = useState('');
  const [creditScore, setCreditScore] = useState(700);
  const [result, setResult] = useState<AffordabilityResult | null>(null);

  const calculateAffordability = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const savingsAmount = parseFloat(savings) || 0;
    
    const disposableIncome = income - expenses;
    
    // Rent should be max 30% of gross income
    const maxRent = income * 0.3;
    
    // Mortgage calculation (assuming 30-year, 6% interest)
    const downPayment = savingsAmount * 0.8; // Keep 20% for emergency
    const monthlyPayment = disposableIncome * 0.35; // Max 35% of disposable income
    const loanAmount = monthlyPayment / 0.00599551; // Monthly payment factor for 6% over 30 years
    const maxPurchase = loanAmount + downPayment;
    
    let recommended: 'rent' | 'buy' | 'both' = 'rent';
    if (savingsAmount > 50000 && creditScore > 680) {
      recommended = 'buy';
    } else if (savingsAmount > 20000 && creditScore > 650) {
      recommended = 'both';
    }
    
    setResult({
      maxRent: Math.floor(maxRent),
      maxPurchase: Math.floor(maxPurchase),
      monthlyMortgage: Math.floor(monthlyPayment),
      recommended,
      canAfford: disposableIncome > 0,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Affordability Calculator
        </CardTitle>
        <CardDescription>
          Find out what you can realistically afford based on your finances
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="income">Monthly Income (After Tax)</Label>
          <Input
            id="income"
            type="number"
            placeholder="5000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="expenses">Monthly Expenses</Label>
          <Input
            id="expenses"
            type="number"
            placeholder="2000"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Include: food, utilities, transport, insurance, debts
          </p>
        </div>

        <div>
          <Label htmlFor="savings">Total Savings</Label>
          <Input
            id="savings"
            type="number"
            placeholder="30000"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Credit Score: {creditScore}</Label>
          <Slider
            value={[creditScore]}
            onValueChange={(value) => setCreditScore(value[0])}
            min={300}
            max={850}
            step={10}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Poor (300)</span>
            <span>Excellent (850)</span>
          </div>
        </div>

        <Button onClick={calculateAffordability} className="w-full">
          Calculate
        </Button>

        {result && (
          <div className="space-y-4 mt-6 pt-6 border-t">
            {result.canAfford ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  You have healthy finances! Here's what you can afford:
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your expenses exceed your income. Consider reducing expenses before committing to property.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Max Monthly Rent</p>
                <p className="text-2xl">£{result.maxRent.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">30% of income</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Max Purchase Price</p>
                <p className="text-2xl">£{result.maxPurchase.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Monthly: £{result.monthlyMortgage.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Recommendation:</span>
              <Badge variant={result.recommended === 'buy' ? 'default' : 'secondary'}>
                {result.recommended === 'buy' ? 'Ready to Buy' : 
                 result.recommended === 'both' ? 'Consider Both Options' : 
                 'Rent for Now'}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
