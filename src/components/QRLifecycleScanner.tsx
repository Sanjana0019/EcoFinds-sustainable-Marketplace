import React, { useState } from 'react';
import { QrCode, X, Leaf, Factory, Truck, Package, Recycle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface QRLifecycleScannerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LifecycleStage {
  id: string;
  title: string;
  location: string;
  date: string;
  carbonFootprint: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const mockProductJourney: LifecycleStage[] = [
  {
    id: '1',
    title: 'Raw Material Source',
    location: 'Cotton Farm, India',
    date: '2023-01-15',
    carbonFootprint: 8.2,
    description: 'Organic cotton harvested from sustainable farm',
    icon: <Leaf className="w-5 h-5" />,
    color: 'bg-green-500'
  },
  {
    id: '2',
    title: 'Manufacturing',
    location: 'Textile Mill, Bangladesh',
    date: '2023-02-20',
    carbonFootprint: 15.7,
    description: 'Fabric woven and dyed using eco-friendly processes',
    icon: <Factory className="w-5 h-5" />,
    color: 'bg-blue-500'
  },
  {
    id: '3',
    title: 'Shipping',
    location: 'Port of Los Angeles, USA',
    date: '2023-03-10',
    carbonFootprint: 12.3,
    description: 'Shipped via cargo container - low emissions transport',
    icon: <Truck className="w-5 h-5" />,
    color: 'bg-orange-500'
  },
  {
    id: '4',
    title: 'Packaging',
    location: 'Distribution Center, California',
    date: '2023-03-20',
    carbonFootprint: 3.1,
    description: 'Packaged in recyclable materials',
    icon: <Package className="w-5 h-5" />,
    color: 'bg-purple-500'
  },
  {
    id: '5',
    title: 'Consumer Use',
    location: 'Previous Owner, San Francisco',
    date: '2023-04-01 - 2024-01-15',
    carbonFootprint: -5.0,
    description: '9 months of use, well-maintained condition',
    icon: <MapPin className="w-5 h-5" />,
    color: 'bg-indigo-500'
  },
  {
    id: '6',
    title: 'Second-Hand Sale',
    location: 'EcoFinds Marketplace',
    date: '2024-01-15',
    carbonFootprint: -25.5,
    description: 'Extending product lifecycle through resale',
    icon: <Recycle className="w-5 h-5" />,
    color: 'bg-green-600'
  }
];

export function QRLifecycleScanner({ isOpen, onClose }: QRLifecycleScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<string | null>(null);
  const [showJourney, setShowJourney] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate QR code scanning
    setTimeout(() => {
      setIsScanning(false);
      setScannedProduct("Vintage Denim Jacket - ID: DJ001");
      setShowJourney(true);
    }, 2000);
  };

  const totalCarbonSaved = mockProductJourney
    .filter(stage => stage.carbonFootprint < 0)
    .reduce((total, stage) => total + Math.abs(stage.carbonFootprint), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <QrCode className="mr-2 text-blue-600" />
            Product Lifecycle Tracker
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!showJourney ? (
            <div className="text-center py-8">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                {isScanning ? (
                  <div className="animate-spin">
                    <QrCode size={48} className="text-blue-600" />
                  </div>
                ) : (
                  <QrCode size={48} className="text-gray-400" />
                )}
              </div>
              
              {isScanning ? (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Scanning QR Code...</h3>
                  <p className="text-muted-foreground">Please hold your camera steady</p>
                </div>
              ) : scannedProduct ? (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-green-600">✓ Product Scanned</h3>
                  <p className="text-foreground font-medium">{scannedProduct}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Scan Product QR Code</h3>
                  <p className="text-muted-foreground">
                    Point your camera at the QR code on the product to see its complete journey
                  </p>
                  <Button 
                    onClick={handleScan}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    <QrCode size={20} className="mr-2" />
                    Start Scanning
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">{scannedProduct}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{totalCarbonSaved.toFixed(1)}kg</div>
                    <div className="text-sm text-green-800">CO₂ Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">6</div>
                    <div className="text-sm text-blue-800">Journey Stages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">287</div>
                    <div className="text-sm text-purple-800">Days in Use</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">2nd</div>
                    <div className="text-sm text-orange-800">Life Cycle</div>
                  </div>
                </div>
              </div>

              {/* Journey Visualization */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Product Journey</h4>
                <div className="relative">
                  {/* Journey Line */}
                  <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                  
                  {mockProductJourney.map((stage, index) => (
                    <div key={stage.id} className="relative flex items-start space-x-4 pb-6">
                      {/* Stage Icon */}
                      <div className={`${stage.color} text-white p-3 rounded-full z-10`}>
                        {stage.icon}
                      </div>
                      
                      {/* Stage Content */}
                      <div className="flex-1 bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-foreground">{stage.title}</h5>
                          <Badge variant={stage.carbonFootprint < 0 ? "default" : "secondary"}>
                            {stage.carbonFootprint > 0 ? '+' : ''}{stage.carbonFootprint} kg CO₂
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            {stage.location}
                          </span>
                          <span>{stage.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environmental Impact Summary */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Leaf className="mr-2" />
                    Environmental Impact Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Total Carbon Footprint Reduction:</span>
                    <span className="font-bold text-green-800">{totalCarbonSaved.toFixed(1)} kg CO₂</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Equivalent to:</span>
                    <span className="font-bold text-green-800">{(totalCarbonSaved / 2.31).toFixed(0)} miles not driven</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Trees equivalent:</span>
                    <span className="font-bold text-green-800">{(totalCarbonSaved / 21.77).toFixed(1)} trees planted</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    setShowJourney(false);
                    setScannedProduct(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Scan Another Product
                </Button>
                <Button 
                  onClick={onClose}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}