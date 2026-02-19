"use client";

import { useState } from 'react';
import {
    Mail,
    Send,
    Plus,
    Eye,
    Edit,
    Trash2,
    FileText,
    CheckCircle2,
    Users,
    Layout,
    MousePointer2,
    X,
    Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { emailTemplates, EmailTemplate } from '@/data/emailTemplates';

export default function AdminMarketing() {
    const [activeTab, setActiveTab] = useState('Templates');
    const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
    const [showHtml, setShowHtml] = useState(false);

    const stats = [
        { label: 'Email Subscribers', value: '12,840', change: '+15%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Avg. Delivery Rate', value: '99.2%', change: 'Excellent', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Avg. Click Rate', value: '22.4%', change: '+2.4%', icon: MousePointer2, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Marketing & Emails</h1>
                    <p className="text-gray-500">Manage email campaigns, templates, and customer outreach.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all border border-gray-200">
                        <Mail className="h-4 w-4" />
                        <span>New Campaign</span>
                    </button>
                    <button className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95">
                        <Plus className="h-5 w-5" />
                        <span>Create Template</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-gray-900">{stat.label}</h3>
                        </div>
                        <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                        <p className={cn("text-xs font-bold mt-1", stat.color)}>{stat.change} from last month</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                    {['Templates', 'Campaigns', 'Automations'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-8 py-4 text-sm font-bold transition-all border-b-2",
                                activeTab === tab ? "border-red-600 text-red-600" : "border-transparent text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-0">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
                                <th className="px-6 py-4">Template Name</th>
                                <th className="px-6 py-4">Subject Line</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {emailTemplates.map((tpl) => (
                                <tr key={tpl.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded text-gray-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                                                <Layout className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{tpl.name}</p>
                                                <p className="text-[10px] text-gray-400 font-mono underline decoration-dotted">{tpl.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-500 italic max-w-xs truncate">{tpl.subject}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                                            tpl.category === 'transactional' ? "bg-amber-100 text-amber-700" :
                                                tpl.category === 'marketing' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                        )}>
                                            {tpl.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setPreviewTemplate(tpl)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 rounded-lg"
                                                title="Preview Template"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 rounded-lg" title="Edit">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 rounded-lg" title="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Preview Modal */}
            {previewTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{previewTemplate.name}</h3>
                                <p className="text-sm text-gray-500">Subject: <span className="italic">{previewTemplate.subject}</span></p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowHtml(!showHtml)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                                        showHtml ? "bg-gray-900 text-white" : "bg-white text-gray-700 border border-gray-200"
                                    )}
                                >
                                    {showHtml ? <Layout className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                                    {showHtml ? 'Show Preview' : 'Show HTML'}
                                </button>
                                <button
                                    onClick={() => { setPreviewTemplate(null); setShowHtml(false); }}
                                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto bg-gray-200 p-8 flex justify-center">
                            {showHtml ? (
                                <pre className="w-full max-w-2xl bg-gray-900 text-emerald-400 p-6 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                                    {previewTemplate.html}
                                </pre>
                            ) : (
                                <div className="bg-white shadow-lg w-full max-w-2xl rounded-lg overflow-hidden border border-gray-300">
                                    <div dangerouslySetInnerHTML={{ __html: previewTemplate.html }} />
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-3">
                            <button className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all">Download .html</button>
                            <button className="px-6 py-2.5 bg-[#e31e24] text-white rounded-xl font-bold shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all">Send Test Email</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
