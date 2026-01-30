import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Shield, QrCode, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    usage: 'self', // 'self' or 'gift'
    notes: ''
  });

  const handleNext = () => {
    if (!formData.name || !formData.phone) {
      alert("请填写必填项");
      return;
    }
    // Phone number validation: must be 11 digits
    if (!/^\d{11}$/.test(formData.phone)) {
        alert("请输入正确的11位手机号");
        return;
    }
    setStep('payment');
  };
  
  const handlePaymentSuccess = () => {
      setStep('success');
  }

  const reset = () => {
    setStep('form');
    setFormData({ name: '', phone: '', usage: 'self', notes: '' });
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300); // Reset after animation finishes
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row h-auto max-h-[90vh]"
            >
              {/* Left Side: Product Info */}
              <div className="bg-[#F0EEE5] p-8 md:w-1/2 border-r border-[#E5E1D0] flex flex-col">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-[#E5E1D0] mb-8 relative overflow-hidden">
                    
                    <h4 className="text-2xl font-bold text-[#222222] mb-2">人生传记典藏版</h4>
                    <div className="text-3xl font-bold text-[#BC5834] mb-6">¥ 8,888</div>
                    
                    <div className="space-y-4 mb-6">
                      <p className="font-bold text-gray-700">包含服务：</p>
                      <ul className="space-y-3">
                        {[
                          "陪伴式深度采访",
                          "专业传记作家团队写作",
                          "最多20万字撰写",
                          "精装实体书2本"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600">
                            <div className="w-5 h-5 rounded-full bg-[#BC5834]/10 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-[#BC5834]" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                    <Shield className="w-4 h-4" />
                    <span>信息安全保障 · 官方担保交易</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Form or Summary or Success */}
              <div className="p-8 md:w-1/2 flex flex-col overflow-y-auto relative">
                <div className="flex justify-end mb-4 absolute top-4 right-4 z-10">
                   <button onClick={handleClose} className="text-gray-400 hover:text-[#BC5834]">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {step === 'form' && (
                  <>
                    <h3 className="text-2xl font-bold text-[#222222] mb-6 mt-2">预约服务</h3>
                    <div className="space-y-5 flex-1">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          您的真实姓名 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#BC5834] focus:border-transparent outline-none"
                          placeholder="请输入姓名"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          手机号 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#BC5834] focus:border-transparent outline-none"
                          placeholder="请输入手机号"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">为谁写</label>
                        <div className="flex flex-col gap-3">
                          <label className={`w-full p-3 border rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 text-center ${formData.usage === 'self' ? 'border-[#BC5834] bg-[#BC5834]/5 text-[#BC5834] font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                            <input 
                              type="radio" 
                              name="usage" 
                              value="self" 
                              checked={formData.usage === 'self'}
                              onChange={(e) => setFormData({...formData, usage: e.target.value})}
                              className="hidden" 
                            />
                            为自己
                          </label>
                          <label className={`w-full p-3 border rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 text-center ${formData.usage === 'gift' ? 'border-[#BC5834] bg-[#BC5834]/5 text-[#BC5834] font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                            <input 
                              type="radio" 
                              name="usage" 
                              value="gift" 
                              checked={formData.usage === 'gift'}
                              onChange={(e) => setFormData({...formData, usage: e.target.value})}
                              className="hidden" 
                            />
                            为父母/长辈/他人
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          其他 <span className="text-gray-400 font-normal">(选填)</span>
                        </label>
                        <textarea 
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#BC5834] focus:border-transparent outline-none resize-none"
                          placeholder="如有特殊需求请备注"
                        />
                      </div>
                      
                      <Button fullWidth size="lg" onClick={handleNext} className="mt-4">
                        下一步
                      </Button>
                    </div>
                  </>
                )}

                {step === 'payment' && (
                  <>
                    <button 
                      onClick={() => setStep('form')}
                      className="flex items-center text-sm text-gray-500 hover:text-[#BC5834] mb-4 transition-colors mt-8"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> 返回修改
                    </button>
                    <h3 className="text-2xl font-bold text-[#222222] mb-6">支付订单</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6 text-sm">
                       <div className="flex justify-between">
                         <span className="text-gray-500">联系人</span>
                         <span className="font-medium">{formData.name}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-500">手机号</span>
                         <span className="font-medium">{formData.phone}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-500">为谁写</span>
                         <span className="font-medium">{formData.usage === 'self' ? '为自己' : '为父母/长辈/他人'}</span>
                       </div>
                       {formData.notes && (
                         <div className="border-t border-gray-200 pt-2 mt-2">
                           <span className="text-gray-500 block mb-1">备注</span>
                           <span className="text-gray-700">{formData.notes}</span>
                         </div>
                       )}
                    </div>

                    <div 
                        className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-[#BC5834] border-dashed rounded-xl bg-[#BC5834]/5 cursor-pointer hover:bg-[#BC5834]/10 transition-colors"
                        onClick={handlePaymentSuccess}
                    >
                      <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
                         <QrCode className="w-32 h-32 text-gray-800" />
                      </div>
                      <p className="font-bold text-[#222222] mb-1">微信扫码支付</p>
                      <p className="text-[#BC5834] font-bold text-xl">¥ 8,888</p>
                      <p className="text-xs text-gray-400 mt-2">(点击二维码模拟支付成功)</p>
                    </div>
                  </>
                )}

                {step === 'success' && (
                     <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#222222] mb-4">预约成功</h3>
                        <p className="text-gray-600 mb-8 max-w-xs">
                            感谢您的信任！我们的传记顾问将在24小时内与您联系，请保持电话畅通。
                        </p>
                        <Button fullWidth size="lg" onClick={handleClose}>
                            完成
                        </Button>
                    </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};