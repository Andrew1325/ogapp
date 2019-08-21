export default function ({store, redirect, route}) {
  const user = {...store.state.user}
  console.log(user.permissions)
  const userIsLoggedIn = !!user.id
  let userIsAdmin = false
  if (!!user && user.permissions > 1) {
    userIsAdmin = true
  }
  const urlRequiresAuth = /^\/admin(\/|$)/.test(route.fullPath)
  const urlRequiresNonAuth = /^\/signin(\/|$)/.test(route.fullPath)
  const urlForNewOnly = /^\/signup(\/|$)/.test(route.fullPath)
  if (!userIsLoggedIn && urlRequiresAuth) {
      return redirect('/signin')
  }
  if (userIsLoggedIn && urlForNewOnly) {
      return redirect('/')
  }
  if (userIsLoggedIn && urlRequiresNonAuth) {
      return redirect('/admin')
  }
  if (userIsLoggedIn && !userIsAdmin && urlRequiresAuth) {
      return redirect('/')
  }
  return Promise.resolve
}