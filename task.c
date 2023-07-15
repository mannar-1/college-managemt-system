#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
// Define the BankAccount structure
typedef struct BankAccount {
    char name[100];
    double balance;
    char transactions[5][100];
    int transactionCount;
} BankAccount;

// Function prototypes
void deposit(BankAccount *account, double amount);
void withdraw(BankAccount *account, double amount);
void send(BankAccount *sender, BankAccount *receiver, double amount);
void view(BankAccount *account);
void bankServer();
void atmServer();
void client1Thread();
void client2Thread();

// Global variables
BankAccount client1;
BankAccount client2;

// Queue implementation
typedef struct QueueNode {
    struct QueueNode *next;
    BankAccount *account;
    BankAccount *account2;
    char operation[100];
    double amount;
} QueueNode;

typedef struct Queue {
    QueueNode *front;
    QueueNode *rear;
} Queue;

void enqueue(Queue *queue, BankAccount *account,BankAccount *account2, char *operation, double amount) {
    QueueNode *node = (QueueNode *)malloc(sizeof(QueueNode));
    node->next = NULL;
    node->account = account;
    node->account2= account2;
    strcpy(node->operation, operation);
    node->amount = amount;

    if (queue->rear == NULL) {
        queue->front = queue->rear = node;
    } else {
        queue->rear->next = node;
        queue->rear = node;
    }
}

QueueNode *dequeue(Queue *queue) {
    if (queue->front == NULL) {
        return NULL;
    }

    QueueNode *node = queue->front;
    queue->front = queue->front->next;

    if (queue->front == NULL) {
        queue->rear = NULL;
    }

    return node;
}

// Function to process deposit operation
void deposit(BankAccount *account, double amount) {
    account->balance += amount;

    // Shift transactions and add the new one
    if (account->transactionCount < 5) {
        account->transactionCount++;
    } else {
        for (int i = 0; i < 4; i++) {
            strcpy(account->transactions[i], account->transactions[i + 1]);
        }
    }

    sprintf(account->transactions[account->transactionCount - 1], "Deposited %.2lf", amount);
}

// Function to process withdraw operation
void withdraw(BankAccount *account, double amount) {
    if (account->balance >= amount) {
        account->balance -= amount;

        // Shift transactions and add the new one
        if (account->transactionCount < 5) {
            account->transactionCount++;
        } else {
            for (int i = 0; i < 4; i++) {
                strcpy(account->transactions[i], account->transactions[i + 1]);
            }
        }

        sprintf(account->transactions[account->transactionCount - 1], "Withdrew %.2lf", amount);
    } else {
        printf("\nInsufficient funds for %s\n", account->name);
    }
}

// Function to process send operation
void send(BankAccount *sender, BankAccount *receiver, double amount) {
    if (sender->balance >= amount) {
        sender->balance -= amount;
        receiver->balance += amount;

        // Shift sender's transactions and add the new one
        if (sender->transactionCount < 5) {
            sender->transactionCount++;
        } else {
            for (int i = 0; i < 4; i++) {
                strcpy(sender->transactions[i], sender->transactions[i + 1]);
            }
        }

        sprintf(sender->transactions[sender->transactionCount - 1], "Sent %.2lf to %s", amount, receiver->name);

        // Shift receiver's transactions and add the new one
        if (receiver->transactionCount < 5) {
            receiver->transactionCount++;
        } else {
            for (int i = 0; i < 4; i++) {
                strcpy(receiver->transactions[i], receiver->transactions[i + 1]);
            }
        }

        sprintf(receiver->transactions[receiver->transactionCount - 1], "Received %.2lf from %s", amount, sender->name);
    } else {
        printf("Insufficient funds for %s\n", sender->name);
    }
}

// Function to view account details
void view(BankAccount *account) {
    printf("\n%s's balance: %.2lf\n", account->name, account->balance);
    printf("%s's transactions:\n", account->name);
    for (int i = 0; i < account->transactionCount; i++) {
        printf("%s\n", account->transactions[i]);
    }
}

// Bank server thread function
void bankServer() {
    Queue queue;
    queue.front = queue.rear = NULL;

    while (1) {
        QueueNode *node = dequeue(&queue);

        if (node != NULL) {
            if (strcmp(node->operation, "deposit") == 0) {
                deposit(node->account, node->amount);
                printf("\nBank server processed deposit request of %.2lf for %s\n", node->amount, node->account->name);
            } else if (strcmp(node->operation, "send") == 0) {
                send(node->account, node->account2, node->amount);
                printf("\nBank server processed send request of %.2lf from %s to %s\n", node->amount, node->account->name, node->account2->name);
            } else if (strcmp(node->operation, "view") == 0) {
                view(node->account);
                printf("\nBank server processed view request for %s\n", node->account->name);
            }

            free(node);
        }
    }
}

// ATM server thread function
void atmServer() {
    Queue queue;
    queue.front = queue.rear = NULL;

    while (1) {
        QueueNode *node = dequeue(&queue);

        if (node != NULL) {
            if (strcmp(node->operation, "withdraw") == 0) {
                withdraw(node->account, node->amount);
                printf("\nATM server processed withdraw request of %.2lf for %s\n", node->amount, node->account->name);
            } else if (strcmp(node->operation, "view") == 0) {
                view(node->account);
                printf("\nATM server processed view request for %s\n", node->account->name);
            }

            free(node);
        }
    }
}
 Queue clientQueue;
// Client1 thread function
void client1thread() {
    // Send requests to the bank server
    enqueue(&clientQueue, &client1,&client2 ,"deposit", 500);
    enqueue(&clientQueue, &client1,&client2 , "withdraw", 200);
    enqueue(&clientQueue, &client1,&client2 , "send", 300);
    enqueue(&clientQueue, &client1,&client2 , "view", 0);
}

// Client2 thread function
void client2thread() {
    // Send requests to the bank server
    enqueue(&clientQueue, &client2,&client1 , "deposit", 400);
    enqueue(&clientQueue, &client2,&client1 , "withdraw", 100);
    enqueue(&clientQueue, &client2,&client1 , "send", 200);
    enqueue(&clientQueue, &client2,&client1 , "view", 0);
}

int main() {
    
    // printf("oerwifhwjfg");
    // Initialize bank accounts
    strcpy(client1.name, "Client1");
    client1.balance = 1000;
    client1.transactionCount = 0;
    
    strcpy(client2.name, "Client2");
    client2.balance = 1000;
    client2.transactionCount = 0;

    // Create threads
    pthread_t bankServerThread, atmServerThread, client1Thread, client2Thread;

    // Start threads
    pthread_create(&bankServerThread, NULL, (void *)bankServer, NULL);
    pthread_create(&atmServerThread, NULL, (void *)atmServer, NULL);
    pthread_create(&client1Thread, NULL, (void *)client1thread, NULL);
    pthread_create(&client2Thread, NULL, (void *)client2thread, NULL);

    // Wait for threads to finish
    pthread_join(bankServerThread, NULL);
    pthread_join(atmServerThread, NULL);
    pthread_join(client1Thread, NULL);
    pthread_join(client2Thread, NULL);

    return 0;
}


