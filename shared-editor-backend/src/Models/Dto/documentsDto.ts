export class DocumentsDto {
  id: number;
  title: string;
  content: JSON;
  created_at?: Date;
  updated_at?: Date;
  version?: number;

  constructor(
    id: number | undefined,
    title: string,
    content: JSON,
    created_at: Date,
    updated_at: Date,
    version: number,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.version = version;
  }
}
