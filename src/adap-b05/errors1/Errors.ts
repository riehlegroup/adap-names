/**
 * Unclear purpose of file, keeping it for now (not used)
 */

enum FS_ERROR_TYPES {
    FILE_NOT_FOUND,
    READ_ERROR,
    WRITE_ERROR,
    CORRUPT_DATA
}

export type CorruptDataError = {
    id: number;
    type: FS_ERROR_TYPES;
    source: Object;
    message: string;
}

export class FileNotFoundException extends Error {
    protected id: number;
    protected source: Object | null;

    constructor(id: number, source?: Object, msg?: string) {
        super(msg);
        this.id = id;
        if(source != undefined) {
            this.source = source;
        } else {
            this.source = null;
        }
    }

}