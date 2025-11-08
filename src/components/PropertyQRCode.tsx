import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Download, Share2, QrCode as QrCodeIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import QRCode from 'qrcode';

interface PropertyQRCodeProps {
  propertyId: string;
  propertyTitle: string;
  propertyUrl?: string;
}

export function PropertyQRCode({ propertyId, propertyTitle, propertyUrl }: PropertyQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Generate URL for the property
  const url = propertyUrl || `${window.location.origin}?page=property&id=${propertyId}`;

  useEffect(() => {
    if (canvasRef.current) {
      // Generate QR code
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 300,
          margin: 2,
          color: {
            dark: '#2563eb', // Blue color
            light: '#ffffff',
          },
        },
        (error: any) => {
          if (error) {
            console.error('Error generating QR code:', error);
          }
        }
      );
    }
  }, [url]);

  const handleDownload = () => {
    if (canvasRef.current) {
      // Convert canvas to blob and download
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${propertyTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-qr-code.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success('QR code downloaded successfully');
        }
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share && canvasRef.current) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `${propertyTitle}-qr-code.png`, { type: 'image/png' });
            await navigator.share({
              title: propertyTitle,
              text: `Check out this property: ${propertyTitle}`,
              files: [file],
              url: url,
            });
            toast.success('QR code shared successfully');
          }
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Failed to share QR code');
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(url);
      toast.success('Property URL copied to clipboard');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCodeIcon className="h-5 w-5" />
          Property QR Code
        </CardTitle>
        <CardDescription>
          Scan this code to view property details instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
          <canvas ref={canvasRef} />
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            <strong>Property URL:</strong>
            <div className="mt-1 p-2 bg-gray-50 rounded text-xs break-all font-mono">
              {url}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Download QR Code
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <p>• Print this QR code on flyers and property signs</p>
          <p>• Share it on social media to attract more viewers</p>
          <p>• Include it in property brochures and marketing materials</p>
        </div>
      </CardContent>
    </Card>
  );
}
