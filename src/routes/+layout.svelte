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
            {#await userRequest then user}
              {#if user}
                {user.email}さん <a href="/logout">ログアウト</a>
              {:else}
                <a href="/login">ゲストさん</a>
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
    padding-right: 10px;
    padding-left: 10px;
  }

  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 15px;
    height: 50px;
  }

  .header-title {
    color: #1e293b;
    font-weight: bold;
    text-decoration: none;
    white-space: nowrap;
  }

  .header-links {
    display: flex;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  @media screen and (max-width: 767px) {
    .header-title {
      font-size: 20px;
    }
    .header-inner {
      flex-direction: column;
      height: auto;
      padding-top: 10px;
      padding-bottom: 10px;
      row-gap: 10px;
    }
  }
</style>
