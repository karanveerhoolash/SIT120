const app = Vue.createApp({
    data() {
        return {
            goals: [],
            newGoal: {
                title: "",
                description: "",
                category: "fitness",
                targetDate: "",
            },
            progressValue: "",
            editingGoalIndex: -1,
            reminders: [],
            newReminder: {
                text: "",
                date: "",
            },
            badges: [],
        };
    },
    methods: {
        createGoal() {
            // Create a new goal and add it to the goals list
            this.goals.push({ ...this.newGoal, progress: undefined });
            // Reset the form fields
            this.newGoal = {
                title: "",
                description: "",
                category: "fitness",
                targetDate: "",
            };
        },
        logProgress(goalIndex) {
            // Log progress for a specific goal
            const progress = parseFloat(this.progressValue);
            if (!isNaN(progress) && progress >= 0) {
                this.goals[goalIndex].progress = progress;
                this.progressValue = "";
            }
        },
        editGoal(index) {
            // Enable editing mode for a goal
            this.editingGoalIndex = index;
            // Copy the goal data to the form for editing
            const editedGoal = this.goals[index];
            this.newGoal = { ...editedGoal };
        },
        saveEditedGoal() {
            // Save the edited goal data
            this.goals[this.editingGoalIndex] = { ...this.newGoal };
            // Reset the form and exit editing mode
            this.newGoal = {
                title: "",
                description: "",
                category: "fitness",
                targetDate: "",
            };
            this.editingGoalIndex = -1;
        },
        cancelEdit() {
            // Cancel editing mode without saving changes
            this.newGoal = {
                title: "",
                description: "",
                category: "fitness",
                targetDate: "",
            };
            this.editingGoalIndex = -1;
        },
        deleteGoal(index) {
            // Delete a goal
            if (confirm("Are you sure you want to delete this goal?")) {
                this.goals.splice(index, 1);
            }
        },
        setReminder() {
            // Create a new reminder and add it to the reminders list
            this.reminders.push({ ...this.newReminder });
            // Reset the reminder form fields
            this.newReminder = {
                text: "",
                date: "",
            };
        },
    },
    computed: {
        // Filter goals that are completed (100% progress)
        completedGoals() {
            return this.goals.filter((goal) => goal.progress === 100);
        },
    },
    watch: {
        // Watch for changes in goals and save to local storage
        goals: {
            handler(newGoals) {
                localStorage.setItem("goals", JSON.stringify(newGoals));
            },
            deep: true,
        },
        // Watch for changes in reminders and save to local storage
        reminders: {
            handler(newReminders) {
                localStorage.setItem("reminders", JSON.stringify(newReminders));
            },
            deep: true,
        },
        // Watch for changes in badges and save to local storage
        badges: {
            handler(newBadges) {
                localStorage.setItem("badges", JSON.stringify(newBadges));
            },
            deep: true,
        },
    },
    mounted() {
        // Load goals from local storage if available
        const savedGoals = localStorage.getItem("goals");
        if (savedGoals) {
            this.goals = JSON.parse(savedGoals);
        }

        // Load reminders from local storage if available
        const savedReminders = localStorage.getItem("reminders");
        if (savedReminders) {
            this.reminders = JSON.parse(savedReminders);
        }

        // Load badges from local storage if available
        const savedBadges = localStorage.getItem("badges");
        if (savedBadges) {
            this.badges = JSON.parse(savedBadges);
        }
    },
});

app.mount("#dashboard");
