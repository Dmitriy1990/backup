import { ReportHandler } from "web-vitals";

const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<void> => {
  if (onPerfEntry == null) {
    throw new Error('onPerfEntry is null');
  }

  const res = await import('web-vitals');
  res.getCLS(onPerfEntry);
  res.getFID(onPerfEntry);
  res.getFCP(onPerfEntry);
  res.getLCP(onPerfEntry);
  res.getTTFB(onPerfEntry);
};

void reportWebVitals();
