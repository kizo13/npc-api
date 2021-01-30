export const updateBlobToBase64 = (object) => {
  if (object) {
    return {
      ...object,
      blob: Buffer.from(object.blob, 'base64').toString('ascii'),
    };
  }
  return object;
};
