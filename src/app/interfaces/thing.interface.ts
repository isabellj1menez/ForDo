export default interface Thing {
    ok: string,
    Things: Array<contentThng>
}


export interface contentThng{
  complete: boolean,
  created_date: string,
  thing:string,
  _id: string
}