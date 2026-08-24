import { 
  RiHome4Line, 
  RiPlantLine, 
  RiDropLine, 
  RiFlaskLine, 
  RiFileTextLine 
} from 'react-icons/ri';
import { formatDate } from './dateUtils';

/**
 * Dynamically generates structured notifications from live entity records
 */
export const generateNotificationsFromData = ({
  farms = [],
  crops = [],
  irrigations = [],
  fertilizers = [],
  reports = []
}) => {
  const notifications = [];
  const farmNameMap = {};
  farms.forEach(f => { farmNameMap[f.farmId] = f.farmName; });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Farms: New farm added
  farms.forEach(f => {
    notifications.push({
      id: `farm-${f.farmId}`,
      category: 'Farm',
      title: `New Farm Added`,
      desc: `🏡 New farm "${f.farmName}" added successfully.`,
      icon: RiHome4Line,
      color: 'text-primary',
      bg: 'bg-primary/10',
      time: 'Recently',
      rawSortOrder: f.farmId || 0,
      read: false,
    });
  });

  // 2. Crops: Harvest due within next 7 days or today, or crop registered
  crops.forEach(c => {
    let isUpcoming = false;
    let timeText = 'Recently';

    if (c.harvestingDate) {
      const harvestDate = new Date(c.harvestingDate);
      harvestDate.setHours(0, 0, 0, 0);
      const diffTime = harvestDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays <= 7) {
        isUpcoming = true;
        timeText = diffDays === 0 ? 'due today!' : `due in ${diffDays} day${diffDays > 1 ? 's' : ''}.`;
      } else {
        timeText = formatDate(c.harvestingDate);
      }
    }

    if (isUpcoming) {
      notifications.push({
        id: `crop-${c.cropId}`,
        category: 'Crop',
        title: `Harvest Upcoming`,
        desc: `🌾 Harvest for ${c.cropName} is ${timeText}`,
        icon: RiPlantLine,
        color: 'text-amber-600',
        bg: 'bg-amber-100',
        time: timeText,
        rawSortOrder: (c.cropId || 0) + 1000,
        read: false,
      });
    } else {
      notifications.push({
        id: `crop-${c.cropId}`,
        category: 'Crop',
        title: `Crop Registered`,
        desc: `🌾 Crop "${c.cropName}" is in ${c.status || 'Growing'} stage.`,
        icon: RiPlantLine,
        color: 'text-amber-600',
        bg: 'bg-amber-100',
        time: timeText,
        rawSortOrder: c.cropId || 0,
        read: false,
      });
    }
  });

  // 3. Irrigation: Schedule date today or upcoming
  irrigations.forEach(i => {
    const farmName = farmNameMap[i.farmId] || `Farm #${i.farmId}`;
    notifications.push({
      id: `irrigation-${i.irrigationId}`,
      category: 'Irrigation',
      title: `Irrigation Scheduled`,
      desc: `💧 Irrigation (${i.irrigationType || 'Watering'}) scheduled for ${farmName}.`,
      icon: RiDropLine,
      color: 'text-sky-600',
      bg: 'bg-sky-100',
      time: formatDate(i.scheduleDate),
      rawSortOrder: (i.irrigationId || 0) + 500,
      read: false,
    });
  });

  // 4. Fertilizer: Application date today/tomorrow or registered
  fertilizers.forEach(ft => {
    const farmName = farmNameMap[ft.farmId] || `Farm #${ft.farmId}`;
    notifications.push({
      id: `fertilizer-${ft.fertilizerId}`,
      category: 'Fertilizer',
      title: `Fertilizer Application`,
      desc: `🧪 Apply ${ft.fertilizerName} fertilizer to ${farmName}.`,
      icon: RiFlaskLine,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      time: formatDate(ft.applicationDate),
      rawSortOrder: (ft.fertilizerId || 0) + 500,
      read: false,
    });
  });

  // 5. Reports: Report added
  reports.forEach(r => {
    notifications.push({
      id: `report-${r.reportId}`,
      category: 'Reports',
      title: `Report Generated`,
      desc: `📄 New ${r.reportType || 'Farm'} Report generated.`,
      icon: RiFileTextLine,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      time: formatDate(r.reportDate),
      rawSortOrder: (r.reportId || 0) + 2000,
      read: false,
    });
  });

  // Sort newest first
  notifications.sort((a, b) => b.rawSortOrder - a.rawSortOrder);

  return notifications;
};
