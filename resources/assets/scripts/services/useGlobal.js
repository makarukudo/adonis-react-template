import React from 'react'
import globalHook from 'use-global-hook'
import store from 'store'

import actions from './actions'
import initState from './initState'


const useGlobal = globalHook(React, initState, actions)

// const useGlobal = () => {
//   const [state, actions] =
//   console.log("STATE", state)
//   return [state, actions]
// }

export default useGlobal
