import React, { useEffect, useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from '../../src';

// 导入 ./cozeData.text

import { cozeData } from './cozeData';
import { ITypedChar } from '../../src/defined';

interface CMDDemoProps {
  id?: number;
}

const input =
  '# 对话流程树\n\n| 结构序号 | 结构名称        | 参考话术                                                                                                                                 |\n|----------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------|\n| 1.0      | 动态开场        | "王总您好，我是网易云商特派顾问小云（工号NC278），监测到您账户的服务窗口将在48小时后关闭，特别来电确认您的部署进展"                       |\n| 1.1      | 紧急状态同步    | "技术团队下周将升级服务系统，现在确认方案可锁定当前算力配置"                                                                             |\n| 2.0      | 满意度诊断      | "请问之前的服务响应速度是否符合您的预期？（停顿1.5秒）目前系统显示您有3项待确认服务"                                                     |\n| 2.1      | 正向反馈承接    | "感谢认可！已为您标注五星评价，现在可额外开通专属服务通道"                                                                               |\n| 2.2      | 负向反馈处理    | "非常理解您的感受，我司已启动服务升级计划（系统提示音：滴滴），建议您现在确认补偿方案"                                                   |\n| 3.0      | 限时方案呈现    | "这是为您保留的优先部署权限，倒计时23分钟可享受（提高音量）①双倍服务积分 ②专属技术小组 ③服务监测大屏权限"                               |\n| 3.1      | 决策压力施加    | "您同区域的张总5分钟前刚完成确认，现在剩余席位还剩2个"                                                                                   |\n| 4.0      | 闭环确认        | "为保障您的权益，请确认：①是否解决历史服务问题 ②是否接受当前优化方案（停顿2秒）系统已收到您的电子确认函"                                 |\n| 4.1      | 服务延伸        | "已为您开通实时监测入口，点击短信链接可查看服务部署热力图，工程师将在14:30主动对接"                                                       |\n\n（注：每个节点设置6-8秒的黄金静默区间，在客户查看服务大屏时同步进行满意度问卷推送）';

const modulePrefix = 'CMDDemo';
const CMDDemo: React.FC<CMDDemoProps> = (props: CMDDemoProps) => {
  const cmdRef = useRef<MarkdownCMDRef>(null!);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      return;
    }
    mountedRef.current = true;

    async function pushData() {
      while (true) {
        const timeout = 100 + Math.random() * 100;
        await new Promise((resolve) => setTimeout(resolve, timeout));

        const data = cozeData.shift();

        if (data) {
          if (data.answerType === 'thinking') {
            continue;
          }
          // 只处理支持的答案类型，其他类型跳过或映射为 'answer'
          const supportedAnswerType = data.answerType === 'answer' ? 'answer' : 'answer';
          cmdRef.current.push(data.content, supportedAnswerType);
        }

        if (!data || cozeData.length === 0) {
          break;
        }
      }
    }

    pushData();
    // cmdRef.current.push(data.thinking_content, 'thinking');
    // cmdRef.current.push(data.content, 'answer');
  }, []);

  const interval = 16.67;
  const flag = true;
  const timerType = flag ? 'requestAnimationFrame' : 'setTimeout';

  const onTypedChar = () => {
    // console.log('onTypedChar', data);
  };

  return (
    <div className="ds-message-box">
      <div style={{ padding: '20px 50px' }}>
        <button
          onClick={() => {
            cmdRef.current.stop();
          }}
        >
          stop
        </button>
        <button
          onClick={() => {
            cmdRef.current.resume();
          }}
        >
          resume
        </button>
      </div>
      <div className="ds-message-list">
        <MarkdownCMD interval={interval} ref={cmdRef} timerType={timerType} theme="light" onTypedChar={onTypedChar} />
      </div>
    </div>
  );
};

export default CMDDemo;
