import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { FileText, CheckCircle, CreditCard, Home } from 'lucide-react';

export function LegalEngagement() {
  const [purchaseProgress] = useState(25);
  const [offerAmount, setOfferAmount] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="mb-2">Legal Engagement</h1>
      <p className="text-gray-600 mb-8">Complete your rental application or purchase offer</p>
      
      <Tabs defaultValue="purchase">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="purchase">Purchase Process</TabsTrigger>
          <TabsTrigger value="rental">Rental Process</TabsTrigger>
        </TabsList>
        
        {/* Purchase Process */}
        <TabsContent value="purchase" className="space-y-6">
          {/* Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Step 1 of 4: Make Offer</span>
                  <span>{purchaseProgress}%</span>
                </div>
                <Progress value={purchaseProgress} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="text-sm">Make Offer</div>
                  <Badge className="mt-1 bg-blue-600">In Progress</Badge>
                </div>
                <div className="text-center opacity-50">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="text-sm">Inspection</div>
                  <Badge variant="outline" className="mt-1">Pending</Badge>
                </div>
                <div className="text-center opacity-50">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="text-sm">Legal Review</div>
                  <Badge variant="outline" className="mt-1">Pending</Badge>
                </div>
                <div className="text-center opacity-50">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="text-sm">Payment</div>
                  <Badge variant="outline" className="mt-1">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Make Offer */}
          <Card>
            <CardHeader>
              <CardTitle>Make an Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="property">Selected Property</Label>
                <Input id="property" defaultValue="Modern Family Home - $450,000" disabled />
              </div>
              
              <div>
                <Label htmlFor="offerAmount">Offer Amount ($)</Label>
                <Input
                  id="offerAmount"
                  type="number"
                  placeholder="e.g., 445000"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                />
                <p className="text-sm text-gray-600 mt-1">List Price: $450,000</p>
              </div>
              
              <div>
                <Label htmlFor="downPaymentAmount">Down Payment ($)</Label>
                <Input id="downPaymentAmount" type="number" placeholder="e.g., 90000" />
              </div>
              
              <div>
                <Label htmlFor="contingencies">Contingencies</Label>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Home Inspection</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Financing</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">Appraisal</span>
                  </label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="closingDate">Proposed Closing Date</Label>
                <Input id="closingDate" type="date" />
              </div>
              
              <Separator />
              
              <Button className="w-full">Submit Offer</Button>
            </CardContent>
          </Card>
          
          {/* Solicitor Connection */}
          <Card>
            <CardHeader>
              <CardTitle>Connect with a Solicitor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                A conveyancing solicitor will help you with the legal aspects of your property purchase.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="mb-2">Recommended Solicitors</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div>Johnson & Associates</div>
                      <div className="text-sm text-gray-600">Rating: 4.8/5 • Fee: $1,500</div>
                    </div>
                    <Button variant="outline" size="sm">Select</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div>Smith Legal Services</div>
                      <div className="text-sm text-gray-600">Rating: 4.9/5 • Fee: $1,800</div>
                    </div>
                    <Button variant="outline" size="sm">Select</Button>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">Find Other Solicitors</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Rental Process */}
        <TabsContent value="rental" className="space-y-6">
          {/* Rental Application */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rentalProperty">Selected Property</Label>
                <Input id="rentalProperty" defaultValue="Luxury Downtown Apartment - $3,200/mo" disabled />
              </div>
              
              <Separator />
              
              <h4>Personal Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Smith" />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rentalEmail">Email</Label>
                  <Input id="rentalEmail" type="email" placeholder="john@email.com" />
                </div>
                <div>
                  <Label htmlFor="rentalPhone">Phone</Label>
                  <Input id="rentalPhone" type="tel" placeholder="(555) 123-4567" />
                </div>
              </div>
              
              <Separator />
              
              <h4>Employment Information</h4>
              
              <div>
                <Label htmlFor="employer">Current Employer</Label>
                <Input id="employer" placeholder="Company Name" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Job Title" />
                </div>
                <div>
                  <Label htmlFor="salary">Annual Income ($)</Label>
                  <Input id="salary" type="number" placeholder="e.g., 96000" />
                </div>
              </div>
              
              <Separator />
              
              <h4>References</h4>
              
              <div>
                <Label htmlFor="ref1Name">Reference 1 - Name</Label>
                <Input id="ref1Name" placeholder="Full Name" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ref1Relationship">Relationship</Label>
                  <Input id="ref1Relationship" placeholder="e.g., Previous Landlord" />
                </div>
                <div>
                  <Label htmlFor="ref1Phone">Phone Number</Label>
                  <Input id="ref1Phone" type="tel" placeholder="(555) 123-4567" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ref2Name">Reference 2 - Name</Label>
                <Input id="ref2Name" placeholder="Full Name" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ref2Relationship">Relationship</Label>
                  <Input id="ref2Relationship" placeholder="e.g., Employer" />
                </div>
                <div>
                  <Label htmlFor="ref2Phone">Phone Number</Label>
                  <Input id="ref2Phone" type="tel" placeholder="(555) 123-4567" />
                </div>
              </div>
              
              <Separator />
              
              <Button className="w-full">Submit Application</Button>
            </CardContent>
          </Card>
          
          {/* Credit Check */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Check</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                A credit check is required as part of the rental application process. 
                This helps the landlord assess your financial reliability.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="mb-2">What You Need to Know</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Credit check fee: $35 (non-refundable)</li>
                  <li>• Results typically available within 24-48 hours</li>
                  <li>• Your consent is required to proceed</li>
                </ul>
              </div>
              
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm">
                  I authorize HomeMatch to conduct a credit check as part of my rental application
                </span>
              </label>
              
              <Button className="w-full">Authorize Credit Check</Button>
            </CardContent>
          </Card>
          
          {/* Payment Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="firstMonth">First Month's Rent</Label>
                <Input id="firstMonth" defaultValue="$3,200" disabled />
              </div>
              
              <div>
                <Label htmlFor="securityDeposit">Security Deposit</Label>
                <Input id="securityDeposit" defaultValue="$3,200" disabled />
              </div>
              
              <div>
                <Label htmlFor="totalDue">Total Due at Move-In</Label>
                <Input id="totalDue" defaultValue="$6,400" disabled />
              </div>
              
              <Separator />
              
              <h4>Direct Debit Setup</h4>
              
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" placeholder="Your Bank" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" placeholder="XXXXXXXXXX" />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input id="routingNumber" placeholder="XXXXXXXXX" />
                </div>
              </div>
              
              <Button className="w-full">Setup Direct Debit</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
