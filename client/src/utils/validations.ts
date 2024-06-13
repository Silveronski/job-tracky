export const isFileValidImage = (file: FileList): boolean => {
    if (file[0].size > (1024 * 1024) || !file[0].type.startsWith("image")) return false;
    return true;
}