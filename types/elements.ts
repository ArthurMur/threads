export interface IProductSubtitleProps {
  subtitleClassName?: string
  subtitleRectClassName?: string
}

export interface IProductItemActionBtnProps {
  text: string
  callback?: VoidFunction
  withTooltip?: boolean
  iconClass: string
  marginBottom?: number
}

export interface IProductAvailableProps {
  vendorCode: string
  inStock: number
}
