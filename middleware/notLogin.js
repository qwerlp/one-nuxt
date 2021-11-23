export default function ({ store, redirect }) { // 已登录状态不允许访问
  console.log('kkkk===',store.state.user)
  if (store.state.user) {
      return redirect('/')
    }
  }