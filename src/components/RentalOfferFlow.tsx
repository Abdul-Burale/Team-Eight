import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import {
  FileText,
  CreditCard,
  Shield,
  CheckCircle2,
  AlertCircle,
  Upload,
  Loader2,
  Home,
} from 'lucide-react';
import { Progress } from './ui/progress';

interface RentalOfferFlowProps {
  propertyId: number;
  monthlyRent: number;
  propertyTitle: string;
  onClose: () => void;
}

type Step = 'offer' | 'application' | 'documents' | 'payment' | 'complete';

export function RentalOfferFlow({ propertyId, monthlyRent, propertyTitle, onClose }: RentalOfferFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('offer');
  const [offerAmount, setOfferAmount] = useState(monthlyRent.toString());
  const [moveInDate, setMoveInDate] = useState('');
  const [leaseDuration, setLeaseDuration] = useState('12');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [offerStatus, setOfferStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  
  // Application fields
  const [applicantData, setApplicantData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentAddress: '',
    employer: '',
    annualIncome: '',
    agreeToCredit: false,
    agreeToTerms: false,
  });

  // Documents
  const [uploadedDocs, setUploadedDocs] = useState({
    id: false,
    payslips: false,
    reference: false,
  });

  const steps = [
    { id: 'offer', label: 'Make Offer', icon: FileText },
    { id: 'application', label: 'Application', icon: FileText },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'complete', label: 'Complete', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleSubmitOffer = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOfferStatus('accepted'); // In real app, this would come from backend
    setLoading(false);
    setCurrentStep('application');
  };

  const handleSubmitApplication = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setCurrentStep('documents');
  };

  const handleDocumentUpload = (docType: keyof typeof uploadedDocs) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
  };

  const handleContinueToPayment = () => {
    setCurrentStep('payment');
  };

  const handlePayment = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setCurrentStep('complete');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2 mb-4" />
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = index < currentStepIndex;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-600 text-white'
                      : isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 'offer' && 'Make Your Offer'}
            {currentStep === 'application' && 'Rental Application'}
            {currentStep === 'documents' && 'Upload Documents'}
            {currentStep === 'payment' && 'Secure Payment'}
            {currentStep === 'complete' && 'Application Complete!'}
          </CardTitle>
          <CardDescription>
            {propertyTitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Offer Step */}
          {currentStep === 'offer' && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  Monthly Rent: <span className="font-semibold">£{monthlyRent.toLocaleString()}</span>
                </p>
              </div>

              <div>
                <Label htmlFor="offer">Your Offer (Monthly Rent)</Label>
                <Input
                  id="offer"
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can offer the asking price or make a different offer
                </p>
              </div>

              <div>
                <Label htmlFor="moveIn">Desired Move-in Date</Label>
                <Input
                  id="moveIn"
                  type="date"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="duration">Lease Duration (months)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={leaseDuration}
                  onChange={(e) => setLeaseDuration(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message to Landlord (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself and explain why you'd be a great tenant..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <Button onClick={handleSubmitOffer} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting Offer...
                  </>
                ) : (
                  'Submit Offer'
                )}
              </Button>
            </div>
          )}

          {/* Application Step */}
          {currentStep === 'application' && (
            <div className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Great news! Your offer of £{offerAmount}/month has been accepted by the landlord.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={applicantData.fullName}
                    onChange={(e) => setApplicantData({ ...applicantData, fullName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicantData.email}
                    onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={applicantData.phone}
                  onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="currentAddress">Current Address</Label>
                <Input
                  id="currentAddress"
                  value={applicantData.currentAddress}
                  onChange={(e) => setApplicantData({ ...applicantData, currentAddress: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employer">Current Employer</Label>
                  <Input
                    id="employer"
                    value={applicantData.employer}
                    onChange={(e) => setApplicantData({ ...applicantData, employer: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    type="number"
                    value={applicantData.annualIncome}
                    onChange={(e) => setApplicantData({ ...applicantData, annualIncome: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="credit"
                    checked={applicantData.agreeToCredit}
                    onCheckedChange={(checked) => 
                      setApplicantData({ ...applicantData, agreeToCredit: checked as boolean })
                    }
                  />
                  <label htmlFor="credit" className="text-sm cursor-pointer">
                    I authorize a credit check and background verification
                  </label>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={applicantData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setApplicantData({ ...applicantData, agreeToTerms: checked as boolean })
                    }
                  />
                  <label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the terms and conditions of the rental application
                  </label>
                </div>
              </div>

              <Button
                onClick={handleSubmitApplication}
                disabled={loading || !applicantData.agreeToCredit || !applicantData.agreeToTerms}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue to Documents'
                )}
              </Button>
            </div>
          )}

          {/* Documents Step */}
          {currentStep === 'documents' && (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please upload the following documents to complete your application.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">Photo ID (Driver's License or Passport)</p>
                      <p className="text-sm text-gray-500">Required for identity verification</p>
                    </div>
                    {uploadedDocs.id && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  </div>
                  <Button
                    variant={uploadedDocs.id ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => handleDocumentUpload('id')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadedDocs.id ? 'Uploaded' : 'Upload ID'}
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">Recent Pay Slips (Last 3 months)</p>
                      <p className="text-sm text-gray-500">Required for income verification</p>
                    </div>
                    {uploadedDocs.payslips && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  </div>
                  <Button
                    variant={uploadedDocs.payslips ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => handleDocumentUpload('payslips')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadedDocs.payslips ? 'Uploaded' : 'Upload Pay Slips'}
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">References</p>
                      <p className="text-sm text-gray-500">Previous landlord or employer reference</p>
                    </div>
                    {uploadedDocs.reference && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  </div>
                  <Button
                    variant={uploadedDocs.reference ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => handleDocumentUpload('reference')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadedDocs.reference ? 'Uploaded' : 'Upload Reference'}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleContinueToPayment}
                disabled={!uploadedDocs.id || !uploadedDocs.payslips || !uploadedDocs.reference}
                className="w-full"
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Payment Step */}
          {currentStep === 'payment' && (
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  All payments are securely processed through our authorized deposit holding agent.
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <span className="font-semibold">£{parseInt(offerAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>First Month's Rent:</span>
                  <span className="font-semibold">£{parseInt(offerAmount).toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span>Total Due Today:</span>
                  <span className="font-bold">£{(parseInt(offerAmount) * 2).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button variant="outline" className="h-auto py-4">
                    <CreditCard className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p>Card</p>
                      <p className="text-xs text-gray-500">Credit or Debit</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4">
                    <Home className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p>Bank Transfer</p>
                      <p className="text-xs text-gray-500">Direct transfer</p>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <Label>Set Up Direct Debit for Monthly Payments</Label>
                <Input placeholder="Bank Account Number" />
                <Input placeholder="Sort Code" />
                <p className="text-xs text-gray-500">
                  Automatic payments will be set up for £{offerAmount}/month starting from your move-in date.
                </p>
              </div>

              <Button onClick={handlePayment} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay £${(parseInt(offerAmount) * 2).toLocaleString()}`
                )}
              </Button>
            </div>
          )}

          {/* Complete Step */}
          {currentStep === 'complete' && (
            <div className="text-center space-y-4 py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3>Application Complete!</h3>
              <p className="text-gray-600">
                Congratulations! Your rental application has been approved and your payment has been processed.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-left space-y-2">
                <p className="text-sm">
                  <strong>Next Steps:</strong>
                </p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>You'll receive a lease agreement via email within 24 hours</li>
                  <li>Your deposit is securely held by our authorized agent</li>
                  <li>Direct debit will start on your move-in date: {moveInDate}</li>
                  <li>Move-in instructions will be sent 3 days before your date</li>
                </ul>
              </div>
              <Button onClick={onClose} className="w-full">
                Return to Property Search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
