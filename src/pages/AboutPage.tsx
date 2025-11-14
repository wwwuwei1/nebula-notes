import { PageContainer } from '../components/PageContainer';

export const AboutPage = () => (
  <PageContainer width="xl">
    <div className="rounded-[32px] border border-slate-100 bg-white/70 p-10 shadow-lg">
      <p className="text-sm uppercase tracking-[0.5em] text-primary-400">关于站点</p>
      <h1 className="mt-4 font-display text-4xl text-slate-900">为什么打造 Nebula Notes ？</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
        <p>
          Nebula Notes 是我为课程实践打造的 Serverless 个人博客。它以 Supabase
          承担数据库、接口、鉴权等后端职责，通过 Netlify 自动化部署前端，形成极简但完整的全栈开发链路。
        </p>
        <p>
          我将产品定位为「更适合学生创作者的灵感空间」。界面保持轻盈，功能聚焦在快速发布、评论互动和数据可视化，方便在学习生活中随时记录灵感。
        </p>
        <p>
          整个项目完全开源，你可以 fork、二次开发或直接部署成自己的博客。我也在 README 中整理了从
          Supabase 建表、API 密钥管理到 Netlify
          部署的完整流程，帮助其他同学快速复用这套方案。
        </p>
      </div>
    </div>
  </PageContainer>
);

