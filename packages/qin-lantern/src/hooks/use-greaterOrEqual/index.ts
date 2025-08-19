import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

// 大于等于
export const useGreaterOrEqual = (data: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md') => breakpoints.greaterOrEqual(data)
