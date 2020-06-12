// import { DebugConfiguration } from '@aurelia/debug';
// import { IRouter, RouterConfiguration } from '@aurelia/router';
// import { Aurelia, CustomElement } from '@aurelia/runtime';
// import { assert, TestContext } from '@aurelia/testing';
// import { TestRouterConfiguration } from './configuration';

// describe('Configuration', function () {
//   async function createFixture(config?) {
//     const ctx = TestContext.createHTMLTestContext();
//     const { container, lifecycle } = ctx;
//     container.register(TestRouterConfiguration.for(ctx));

//     const App = CustomElement.define({ name: 'app', template: '<template><au-viewport name="left"></au-viewport><au-viewport name="right"></au-viewport></template>' });
//     const host = ctx.doc.createElement('div');
//     ctx.doc.body.appendChild(host as any);

//     const au = new Aurelia(container)
//       .register(
//         DebugConfiguration,
//         !config ? RouterConfiguration : RouterConfiguration.customize(config),
//         App)
//       .app({ host: host, component: App });

//     const router = container.get(IRouter);

//     await au.start().wait();

//     async function tearDown() {
//       router.deactivate();
//       await au.stop().wait();
//       ctx.doc.body.removeChild(host);
//     }

//     return { au, container, lifecycle, host, router, ctx, tearDown };
//   }

//   // it('can be activated with defaults', async function () {
//   //   const { router, tearDown } = await createFixture();
//   //   assert.strictEqual(router['isActive'], true, `router.isActive`);
//   //   assert.strictEqual(router.instructionResolver.separators.viewport, '@', `router.instructionResolver.separators.viewport`);

//   //   await tearDown();
//   // });

//   // it('can be activated with config object', async function () {
//   //   const { router, tearDown } = await createFixture({ separators: { viewport: '#' } });
//   //   assert.strictEqual(router['isActive'], true, `router.isActive`);
//   //   assert.strictEqual(router.instructionResolver.separators.viewport, '#', `router.instructionResolver.separators.viewport`);

//   //   RouterConfiguration.customize();
//   //   await tearDown();
//   // });

//   // it('can be activated with config function', async function () {
//   //   const { router, tearDown } = await createFixture((router) => {
//   //     router.activate({ separators: { viewport: '%' } });
//   //   });
//   //   assert.strictEqual(router['isActive'], true, `router.isActive`);
//   //   assert.strictEqual(router.instructionResolver.separators.viewport, '%', `router.instructionResolver.separators.viewport`);

//   //   RouterConfiguration.customize();
//   //   await tearDown();
//   // });

//   it('is awaitable at start up', async function () {
//     const ctx = TestContext.createHTMLTestContext();
//     const { container } = ctx;
//     container.register(TestRouterConfiguration.for(ctx));

//     const App = CustomElement.define({ name: 'app', template: '<au-viewport default="foo"></au-viewport>' });
//     const Foo = CustomElement.define({ name: 'foo', template: `<div>foo: \${message}</div>` }, class {
//       public message: string = '';
//       public async enter() {
//         await new Promise(resolve => setTimeout(resolve, 250));
//         this.message = 'Hello, World!';
//       }
//     });

//     const host = ctx.doc.createElement('div');
//     ctx.doc.body.appendChild(host as any);

//     const au = new Aurelia(container)
//       .register(
//         DebugConfiguration,
//         RouterConfiguration,
//         App,
//         Foo)
//       .app({ host: host, component: App });

//       const router = container.get(IRouter);

//     await au.start().wait();

//     assert.includes(host.textContent, 'Hello, World!', `host.textContent`);

//     await au.stop().wait();
//     ctx.doc.body.removeChild(host);
//     router.deactivate();
//   });
// });
