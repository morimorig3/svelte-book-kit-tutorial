<script lang="ts">
  import { FORM_ERRORS_LOGIN } from "./const.js";

  export let form;
</script>

<h2>ログイン</h2>
{#if form?.success}
  <p>入力されたメールアドレスにログインリンクを送信しました。</p>
{:else}
  <form method="post">
    <p>
      <label for="email">メールアドレス</label>
      <input type="text" name="email" id="email" value={form?.email ?? ""} />
      {#if form?.error === FORM_ERRORS_LOGIN.MISSING}
        <div style:color="red">メールアドレスを入力してください。</div>
      {/if}
      {#if form?.error === FORM_ERRORS_LOGIN.INVALID_FORMAT}
        <div style:color="red">メールアドレスに@がありません。</div>
      {/if}
    </p>
    <p>
      <button type="submit">ログイン</button>
    </p>
  </form>
{/if}
