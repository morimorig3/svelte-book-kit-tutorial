<script lang="ts">
  import { afterNavigate } from "$app/navigation";

  export let data;
  $: ({ cart } = data);
  let userRequest = new Promise(() => {});

  afterNavigate(() => {
    userRequest = fetch(`/api/self`).then((res) => res.json());
  });
</script>

<h1>カートを見る</h1>

{#await userRequest then user}
  <div class="cart-wrapper">
    {#if cart.length === 0}
      <p>カートに商品はありません</p>
    {/if}
    <ul class="cart-list">
      {#each cart as { id, name, images, price } (id)}
        <li class="cart-item">
          <a href="/products/{id}">
            <img src={images[0]} alt={name} />
            <p>{name}（{price}円）</p>
          </a>
          <form method="POST" action="?/remove">
            <input type="hidden" value={id} name="productId" />
            <button>削除</button>
          </form>
        </li>
      {/each}
    </ul>
  </div>
  {#if !user}
    <p>
      カートを使うには<a href="/login">ログイン</a>してください。
    </p>
  {/if}
{/await}

<style>
  .cart-list {
    list-style-type: none;
  }
  .cart-list > * {
    padding-bottom: 20px;
    border-bottom: 1px solid #1e293b;
  }
  .cart-list > * + * {
    margin-top: 20px;
  }
  .cart-item a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    column-gap: 20px;
  }
  .cart-item img {
    width: 100px;
    flex-shrink: 0;
  }
  .cart-item {
    display: flex;
    align-items: center;
  }
  .cart-item > form {
    flex-shrink: 0;
  }
</style>
