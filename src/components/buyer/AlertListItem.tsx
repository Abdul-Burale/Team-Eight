import { TrendingDown, Search, CheckCircle2, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Alert {
  id: number;
  alert_type: 'price_drop' | 'new_match' | 'offer_update' | 'market_insight';
  message: string;
  created_at: string;
  is_read: boolean;
}

interface AlertListItemProps {
  alert: Alert;
}

export default function AlertListItem({ alert }: AlertListItemProps) {
  const getIcon = () => {
    switch (alert.alert_type) {
      case 'price_drop':
        return <TrendingDown className="w-5 h-5 text-green-600" />;
      case 'new_match':
        return <Search className="w-5 h-5 text-blue-600" />;
      case 'offer_update':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'market_insight':
        return <Info className="w-5 h-5 text-purple-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTitle = () => {
    switch (alert.alert_type) {
      case 'price_drop':
        return 'Price Drop Alert';
      case 'new_match':
        return 'New Property Match';
      case 'offer_update':
        return 'Offer Accepted';
      case 'market_insight':
        return 'Market Insights';
      default:
        return 'Alert';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const parts = alert.message.split(' / ');
  const title = parts[0] || getTitle();
  const description = parts[1] || alert.message;

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0">
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 mb-1">{title}</p>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {!alert.is_read && (
            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">{formatTimeAgo(alert.created_at)}</p>
      </div>
    </div>
  );
}

