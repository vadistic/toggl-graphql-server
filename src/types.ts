export type ID = string

export type Nullable<T> = T | null | undefined

export interface ModuleContext<DataSources> {
  dataSources: DataSources
}
