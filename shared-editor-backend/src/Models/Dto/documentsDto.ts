export class DocumentsDto {
  id: number;
  title: string;
  content: JSON;
  created_at?: Date;
  updated_at?: Date;

  constructor(
    id: number,
    title: string,
    content: JSON,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
