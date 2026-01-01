"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { WeddingProvider, useWedding, generateId } from "@/store/wedding-store";
import ProgressBar from "@/components/ProgressBar";
import CountdownTimer from "@/components/CountdownTimer";
import { ProductionLine } from "@/components/ProductionLine";

import LiveFeed from "@/components/LiveFeed";
import NewTaskModal from "@/components/NewTaskModal";
import NewPersonModal from "@/components/NewPersonModal";
import NewUpdateModal from "@/components/NewUpdateModal";
import EditUpdateModal, { UpdateData } from "@/components/EditUpdateModal";
import GoLiveModal from "@/components/GoLiveModal";
import WeddingHeader from "@/components/WeddingHeader";
import InvitationCard from "@/components/InvitationCard";
import EditTaskModal from "@/components/EditTaskModal";
import { Task as StoreTask, Person, Update } from "@/types";
import { Task as TaskCardTask, TaskStage } from "@/components/TaskCard";

import { Update as UpdateItemType } from "@/components/UpdateItem";

function FinaleCelebration({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#007aff", "#34c759", "#ff9500", "#ff3b30"],
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">מזל טוב!</h1>
        <p className="text-gray-600 mb-6">אַלץ איז גרייט פאַר דער חתונה!</p>
        <button
          onClick={onDismiss}
          className="btn-primary w-full"
        >
          פארמאַכן
        </button>
      </motion.div>
    </motion.div>
  );
}

function Dashboard() {
  const { state, dispatch, getCategoryProgress, getPersonById, getCategoryById } = useWedding();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showGoLiveModal, setShowGoLiveModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showEditUpdateModal, setShowEditUpdateModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskCardTask | null>(null);
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateData | null>(null);
  const [showFinale, setShowFinale] = useState(false);
  const [hasShownFinale, setHasShownFinale] = useState(false);

  

  // Calculate task-based progress
  const taskProgress = useMemo(() => {
    const total = state.tasks.length;
    const done = state.tasks.filter((t: StoreTask) => t.stage === "done").length;
    const inProgress = state.tasks.filter((t: StoreTask) => t.stage === "active").length;
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, inProgress, percentage };
  }, [state.tasks]);

  useEffect(() => {
    if (taskProgress.percentage >= 100 && !hasShownFinale) {
      setShowFinale(true);
      setHasShownFinale(true);
    }
  }, [taskProgress.percentage, hasShownFinale]);

  const tasksForProductionLine: TaskCardTask[] = useMemo(() => {
    return state.tasks.map((task: StoreTask) => {
      const category = getCategoryById(task.category_id);
      const person = task.assigned_to ? getPersonById(task.assigned_to) : undefined;
      const categoryProgress = getCategoryProgress(task.category_id);

      return {
        id: task.id,
        name: task.name,
        category: category?.name || "אַנדערע",
        categoryEmoji: category?.emoji || "📌",
        assignedTo: person?.short_name,
        stage: task.stage,
        stuck_since: task.stuck_since || null,
        categoryProgress: categoryProgress.percentage,
      };
    });
  }, [state.tasks, getCategoryById, getPersonById, getCategoryProgress]);

  const updatesForFeed: UpdateItemType[] = useMemo(() => {
    return state.updates.map((u: Update) => {
      const person = getPersonById(u.person_id);
      return {
        id: u.id,
        personId: u.person_id,
        personName: person?.name || "אַנאָנים",
        message: u.message,
        timestamp: u.created_at,
        type: u.type,
      };
    });
  }, [state.updates, getPersonById]);

  const categoriesForModal = useMemo(() => {
    return state.categories.map((c) => ({
      id: c.id,
      name: `${c.emoji} ${c.name}`,
    }));
  }, [state.categories]);

  const peopleForModal = useMemo(() => {
    return state.people.map((p) => ({
      id: p.id,
      name: p.name,
      shortName: p.short_name,
      emoji: p.emoji,
    }));
  }, [state.people]);

  const activeTasks = useMemo(() => {
    return state.tasks
      .filter((t: StoreTask) => t.stage === "active" || t.stage === "backlog")
      .map((t: StoreTask) => ({ id: t.id, name: t.name }));
  }, [state.tasks]);

  const handleTaskUpdate = (taskId: string, newStage: TaskStage) => {
    dispatch({ type: "MOVE_TASK", payload: { id: taskId, stage: newStage } });
  };

  const handleAddTask = (task: { name: string; categoryId: string; assigneeId: string }) => {
    const newTask: StoreTask = {
      id: generateId("task"),
      category_id: task.categoryId || state.categories[0]?.id || "",
      name: task.name,
      stage: "backlog",
      assigned_to: task.assigneeId || undefined,
      created_at: new Date(),
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const handleAddPerson = (person: { name: string; shortName: string; emoji: string }) => {
    const newPerson: Person = {
      id: generateId("person"),
      name: person.name,
      short_name: person.shortName,
      emoji: person.emoji,
      is_live: false,
      created_at: new Date(),
    };
    dispatch({ type: "ADD_PERSON", payload: newPerson });
  };

  const handleAddCategory = (category: { name: string; emoji: string }) => {
    const newCategory = {
      id: generateId("cat"),
      name: category.name,
      emoji: category.emoji,
      order: state.categories.length + 1,
    };
    dispatch({ type: "ADD_CATEGORY", payload: newCategory });
  };

  const handleAddUpdate = (update: { personId: string; message: string; goLive: boolean }) => {
    const newUpdate: Update = {
      id: generateId("update"),
      person_id: update.personId,
      message: update.message,
      type: "update",
      created_at: new Date(),
    };
    dispatch({ type: "ADD_UPDATE", payload: newUpdate });

    if (update.goLive) {
      dispatch({
        type: "UPDATE_PERSON",
        payload: { id: update.personId, data: { is_live: true } },
      });
    }
  };

  const handleGoLive = (personId: string, taskId: string) => {
    dispatch({
      type: "UPDATE_PERSON",
      payload: { id: personId, data: { is_live: true, live_task_id: taskId } },
    });
  };

  const handleStopLive = (personId: string) => {
    dispatch({
      type: "UPDATE_PERSON",
      payload: { id: personId, data: { is_live: false, live_task_id: undefined } },
    });
  };

  const handleEditTask = (task: TaskCardTask) => {
    setSelectedTask(task);
    setShowEditTaskModal(true);
  };

  const handleSaveTask = (taskId: string, updates: { name: string; stage: TaskStage; categoryId?: string; assigneeId?: string }) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: { 
        id: taskId, 
        data: { 
          name: updates.name, 
          stage: updates.stage, 
          category_id: updates.categoryId,
          assigned_to: updates.assigneeId 
        } 
      },
    });
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const handleEditUpdate = (update: UpdateItemType) => {
    setSelectedUpdate({
      id: update.id,
      personId: update.personId || "",
      message: update.message,
      type: update.type,
    });
    setShowEditUpdateModal(true);
  };

  const handleSaveUpdate = (updateId: string, data: { personId: string; message: string; type: "update" | "completed" | "milestone" }) => {
    dispatch({
      type: "UPDATE_UPDATE",
      payload: {
        id: updateId,
        data: {
          person_id: data.personId,
          message: data.message,
          type: data.type,
        },
      },
    });
  };

  const handleDeleteUpdate = (updateId: string) => {
    dispatch({ type: "DELETE_UPDATE", payload: updateId });
  };

  return (
    <div className="min-h-screen bg-wedding" dir="rtl">
      {/* Sticky Progress Header */}
      <ProgressBar 
        progress={taskProgress.percentage} 
        done={taskProgress.done}
        total={taskProgress.total}
        inProgress={taskProgress.inProgress}
      />

      <AnimatePresence>
        {showFinale && <FinaleCelebration onDismiss={() => setShowFinale(false)} />}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Header */}
        <WeddingHeader />

        {/* Countdown */}
        <CountdownTimer eventDate={state.settings.event_date} />

        {/* Invitation */}
        <section>
          <div className="section-header">הזמנה</div>
          <InvitationCard />
        </section>

        {/* Tasks Section */}
        <section>
          <div className="section-header">Tasks</div>
          <div className="glass-card overflow-hidden">
            <ProductionLine
              tasks={tasksForProductionLine}
              onTaskUpdate={handleTaskUpdate}
              onAddTask={() => setShowTaskModal(true)}
              onEditTask={handleEditTask}
            />
          </div>
        </section>

        {/* Updates Section */}
        <section className="pb-8">
          <div className="section-header">אַפּדעיטס</div>
          <LiveFeed
            updates={updatesForFeed}
            onAddUpdate={() => setShowUpdateModal(true)}
            onEditUpdate={handleEditUpdate}
            onDeleteUpdate={handleDeleteUpdate}
          />
        </section>
      </div>

      {/* Modals */}
      <NewTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleAddTask}
        onAddPerson={handleAddPerson}
        onAddCategory={handleAddCategory}
        categories={categoriesForModal}
        people={peopleForModal}
      />

      <EditTaskModal
        isOpen={showEditTaskModal}
        onClose={() => {
          setShowEditTaskModal(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        categories={categoriesForModal}
        people={peopleForModal}
      />

      <NewPersonModal
        isOpen={showPersonModal}
        onClose={() => setShowPersonModal(false)}
        onSubmit={handleAddPerson}
      />

      <NewUpdateModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleAddUpdate}
        onAddPerson={handleAddPerson}
        people={peopleForModal}
      />

      <EditUpdateModal
        isOpen={showEditUpdateModal}
        onClose={() => {
          setShowEditUpdateModal(false);
          setSelectedUpdate(null);
        }}
        update={selectedUpdate}
        onSave={handleSaveUpdate}
        onDelete={handleDeleteUpdate}
        people={peopleForModal}
      />

      <GoLiveModal
        isOpen={showGoLiveModal}
        onClose={() => {
          setShowGoLiveModal(false);
          setSelectedPerson(null);
        }}
        person={
          selectedPerson
            ? {
                id: selectedPerson.id,
                name: selectedPerson.name,
                shortName: selectedPerson.short_name,
                emoji: selectedPerson.emoji,
              }
            : null
        }
        tasks={activeTasks}
        onGoLive={handleGoLive}
        onStopLive={handleStopLive}
        isCurrentlyLive={selectedPerson?.is_live || false}
        currentTaskId={selectedPerson?.live_task_id}
      />
    </div>
  );
}

export default function Home() {
  return (
    <WeddingProvider>
      <Dashboard />
    </WeddingProvider>
  );
}
