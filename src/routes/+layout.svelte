<script>
</script>

<header class="header">
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
</header>
<main>
  <slot />
</main>
<footer>
  <small>@copy</small>
</footer>

<style>
  :global(body) {
    margin: 0;
    background-color: #eee;
    padding: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    background-color: #fff;
    padding: 0 15px;
    width: 100%;
    max-width: 800px;
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
