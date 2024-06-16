function downloadSmallFiles(content, fileName, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export function backupDataBase() {
  const allData = Object.keys(localStorage).reduce(
    (obj, str) => ({
      ...obj,
      [str]: localStorage.getItem(str),
    }),
    {},
  );

  downloadSmallFiles(JSON.stringify(allData), 'database.json', 'text/plain');
}

export default backupDataBase;
