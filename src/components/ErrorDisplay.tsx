
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <Alert variant="destructive" className="mb-4 border-none bg-transparent p-0">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold text-red-600 mb-2">Something went wrong</AlertTitle>
          <AlertDescription className="text-gray-700">{message}</AlertDescription>
        </Alert>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Try Again
            </Button>
          )}
          
          <Button
            variant="outline"
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link to="/">
              <Home size={16} />
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
