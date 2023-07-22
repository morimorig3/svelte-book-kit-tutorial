<script>
  import "../reset.css";
  import { afterNavigate } from "$app/navigation";

  export let data;
  $: ({ cart } = data);
  $: cartLength = cart.length;

  let userRequest = new Promise(() => {});
  afterNavigate(() => {
    userRequest = fetch(`/api/self`).then((res) => res.json());
  });
</script>

<div class="wrapper">
  <header>
    <div class="header-inner inner">
      <a href="/" class="header-title">Svelte EC</a>
      <nav>
        <ul class="header-links">
          <li>
            ようこそ
            {#await userRequest then user}
              {#if user}
                {user.email}さん <a href="/logout">ログアウト</a>
              {:else}
                ゲストさん <a href="/login">ログイン</a>
              {/if}
            {/await}
          </li>
          <li>
            <a href="/cart">カート（{cartLength}）</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <div class="inner">
      <slot />
    </div>
  </main>
  <footer>
    <small>&copy; morimorig3</small>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    background-color: #f8fafc;
    padding: 0;
    overflow: hidden;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }
  main {
    flex: 1;
  }
  header {
    border-bottom: 1px solid #e2e8f0;
  }
  footer {
    background-color: #1e293b;
    color: #f8fafc;
    text-align: center;
  }

  .inner {
    max-width: 1024px;
    margin: 0 auto;
  }

  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 15px;
    width: 100%;
    height: 50px;
  }

  .header-title {
    font-weight: bold;
  }

  .header-links {
    display: flex;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
