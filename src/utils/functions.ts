type FileType = 'application/json' | 'text/plain';

interface DownloadOptions {
  filename: string;
  type?: FileType;
}

const downloadBlob = (blob: Blob, filename: string) => {
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = href;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export const extension = (type: FileType) => {
  return type === 'application/json' ? 'json' : 'txt';
};

export const download = (json: string | object, options?: DownloadOptions) => {
  const {
    filename = `plan-pal_${new Date().toISOString()}`,
    type = 'application/json'
  } = options || {};

  const data = typeof json === 'object' ? JSON.stringify(json) : json;
  const blob = new Blob([data], { type });

  downloadBlob(blob, `${filename}.${extension(type)}`);
};

export const tagLabel = (tag: string) => {
  return tag.split('$')[0];
};

export const tagColor = (tag: string) => {
  return tag.split('$')[1];
};
