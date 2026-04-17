import React, { useEffect } from 'react';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { FolderTree, Heart } from 'lucide-react';
import FileTree from '../file-tree/FileTree';
import EditorPane from '../editor/EditorPane';
import ThemeToggle from '../ui/ThemeToggle';

const StudioLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    // Scroll to Ad Section
    const scrollToSupport = () => {
        const adSection = document.getElementById('nandfilemr-ads');
        if (adSection) {
            adSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="nandfilemr-app" className="w-full bg-muted/10 flex flex-col font-sans h-screen">
            {/* 1. File Manager Interface (Tall, Full Featured) */}
            <div className="flex-1 w-full bg-background border-b border-border flex flex-col overflow-hidden relative shadow-sm">
                {/* Top Bar */}
                <div className="h-12 border-b border-border flex items-center px-4 justify-between bg-card text-card-foreground shrink-0 leading-none">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg pl-2">Hungry File Manager</span>
                    </div>
                    {/* Right side actions */}
                    <div className="flex items-center gap-2">
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 text-muted-foreground hidden sm:flex gap-2"
                            onClick={scrollToSupport}
                        >
                            <Heart className="w-4 h-4 text-red-500" /> Support
                        </button>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-h-0 relative flex overflow-hidden">
                    <Group direction="horizontal" className="h-full w-full rounded-none border-0">
                        {/* Sidebar: Conditionally rendered or hidden via CSS */}
                        <Panel
                            id="nandfilemr-sidebar"
                            defaultSize={20}
                            minSize={15}
                            maxSize={40}
                            className={`bg-muted/10 border-r border-border h-full ${!isSidebarOpen ? 'hidden !important' : ''}`}
                        >
                            {/* Wrapper to maintain flex layout inside the "table" display parent */}
                            <div className="flex flex-col h-full w-full overflow-hidden">
                                <div className="p-3 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 shrink-0 border-b border-border/50">
                                    <FolderTree className="w-4 h-4" /> Explorer
                                </div>
                                <div className="flex-1 overflow-auto p-0 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
                                    <div className="text-foreground min-w-[250px]">
                                        <FileTree />
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        {/* Resize Handle - Hide if sidebar is closed */}
                        <Separator className={`w-2 -ml-1 bg-transparent hover:bg-primary/20 transition-colors cursor-col-resize z-50 flex items-center justify-center relative outline-none ${!isSidebarOpen ? 'hidden' : ''}`}>
                            <div className="w-0.5 h-8 bg-border rounded-full" />
                        </Separator>

                        <Panel defaultSize={80} minSize={30}>
                            <div className="h-full w-full flex flex-col bg-background">
                                <EditorPane />
                            </div>
                        </Panel>
                    </Group>
                </div>
            </div>

            {/* Internal Status Bar (Optional) */}
            <div className="h-6 border-t border-border bg-card flex items-center justify-between px-3 shrink-0 text-[10px] text-muted-foreground select-none">
                <div className="flex items-center gap-2">
                    <span>Ready</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>UTF-8</span>
                    <span>PHP</span>
                </div>
            </div>
        </div>
    );
};

export default StudioLayout;
