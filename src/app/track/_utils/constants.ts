export const API_BASE_URL = 'http://127.0.0.1:8000/api/request';

export const STATUS_CATEGORIES = {
  SUCCESS: ['تم التفويض', 'لائق', 'تم وصول العقد', 'تم إصدار التأشيرة', 'مقبول', 'تم توثيق'],
  ERROR: ['لم يتم التفويض', 'غير لائق', 'لم يتم وصول العقد', 'مرفوض', 'cancelled'],
  WAITING_KEYWORDS: ['تحت', 'انتظار', 'إجراء', 'داخل', 'المراجعة'],
};
