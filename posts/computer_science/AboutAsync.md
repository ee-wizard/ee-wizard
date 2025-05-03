---
date: 2025-05-03
title: 关于线程、协程、CPU、CPU-core
category: cs
tags:
- cs
- async
description: 主要是关于Thread和Coroutine的讨论
---

# 宇宙安全声明

1. 本Blog仅用于个人纪录，不会从0到1纪录知识点
2. 本人不擅长cpp，如有错误，请尽情的鞭打我



# 在Cpp中的任意核心与多线程的效率测试

## 测试Code

### **模拟I/O密集型任务**

```cpp
long long simulate_io_task()
{
    // 模拟I/O密集型任务
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    long long sum = 0;
    for (long long i = 0; i < 1000000; ++i)
    {
        sum += i;
    }
    return sum;
}
```

 **获取cpu核心数**

```cpp
 unsigned int cpu_count = std::thread::hardware_concurrency();
 if (cpu_count == 0)
 {
   std::cerr << "Warning: Could not detect number of CPU cores. Defaulting to 1." << std::endl;
   cpu_count = 1; // Fallback
}
std::cout << "CPU核心数量: " << cpu_count << std::endl;
```

### **多核串行测试**

```cpp
    // --- Multi-core Sequential Execution ---
    double time_seq_multi_core = measure_time_ms([&]()
                                                 {
        for (int i = 0; i < num_tasks; ++i) {
            simulate_io_task();
        } });
    std::cout << "多核串行执行CPU密集型任务耗时: " << std::fixed << std::setprecision(2) << time_seq_multi_core << " ms" << std::endl;
```

### **多核多线程测试**

```cpp
    std::vector<double> thread_multipliers = {0.05, 0.1, 0.25, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0};

    for (double k : thread_multipliers)
    {
        int thread_count = static_cast<int>(std::round(cpu_count * k));
        if (thread_count < 1)
            thread_count = 1; // Ensure at least one thread

        double time_mt = measure_time_ms([&]()
                                         {
            std::vector<std::future<long long>> futures;
            futures.reserve(thread_count);
            for (int i = 0; i < thread_count; ++i) {
                // std::launch::async ensures tasks run potentially in parallel on new threads
                futures.push_back(std::async(std::launch::async, simulate_io_task));
            }
            for (auto& fut : futures) {
                fut.get(); // Wait for task completion
            } });
        std::cout << "多核多线程(线程数=核心数*" << k << "=" << thread_count
                  << ")执行CPU密集型任务耗时: " << std::fixed << std::setprecision(2)
                  << time_mt << " ms" << std::endl;
    }
```

### **限制单核心、多线程测试**

限制核心

```cpp
    // --- Set CPU Affinity to Core 0 (Linux specific) ---
#ifdef __linux__
    cpu_set_t mask;
    CPU_ZERO(&mask);
    CPU_SET(0, &mask); // Set affinity to CPU core 0

    pid_t pid = getpid(); // Get current process ID
    if (sched_setaffinity(pid, sizeof(mask), &mask) == -1)
    {
        perror("Error setting CPU affinity");
        std::cerr << "Warning: Could not set CPU affinity. Subsequent tests might use multiple cores." << std::endl;
    }
    else
    {
        std::cout << "CPU affinity set to [0]" << std::endl;
    }
#else
    std::cout << "Warning: CPU affinity setting not implemented for this OS. Subsequent tests will use available cores." << std::endl;
#endif
```

```cpp
    // --- Single-core Multi-threaded Execution (after setting affinity) ---
    // Note: On a single core, true parallelism isn't possible, threads will be time-sliced.
    // The overhead of thread creation/management might make this slower than sequential.
    double time_mt_single_core = measure_time_ms([&]()
                                                 {
        std::vector<std::future<long long>> futures;
        futures.reserve(num_tasks);
        for (int i = 0; i < num_tasks; ++i) {
            futures.push_back(std::async(std::launch::async, simulate_io_task));
        }
        for (auto& fut : futures) {
            fut.get();
        } });
    std::cout << "单核多线程执行CPU密集型任务耗时: " << std::fixed << std::setprecision(2) << time_mt_single_core << " ms" << std::endl;

    // --- Single-core Sequential Execution (after setting affinity) ---
    double time_seq_single_core = measure_time_ms([&]()
                                                  {
        for (int i = 0; i < num_tasks; ++i) {
            simulate_io_task();
        } });
    std::cout << "单核串行执行CPU密集型任务耗时: " << std::fixed << std::setprecision(2) << time_seq_single_core << " ms" << std::endl;
```

### 限制双核、（单）多线程测试

```cpp
// --- Set CPU Affinity to Core 0 and 1 (Linux specific) ---
#ifdef __linux__
    if (cpu_count >= 2)
    { // Only attempt if at least 2 cores exist
        cpu_set_t mask_dual;
        CPU_ZERO(&mask_dual);
        CPU_SET(0, &mask_dual); // Set affinity to CPU core 0
        CPU_SET(1, &mask_dual); // Set affinity to CPU core 1

        if (sched_setaffinity(pid, sizeof(mask_dual), &mask_dual) == -1)
        {
            perror("Error setting CPU affinity to cores 0, 1");
            std::cerr << "Warning: Could not set CPU affinity to cores 0, 1. Subsequent dual-core tests might use more cores." << std::endl;
        }
        else
        {
            std::cout << "\nCPU affinity set to [0, 1] for dual-core tests" << std::endl;
        }
    }
    else
    {
        std::cout << "\nWarning: Less than 2 CPU cores detected. Skipping dual-core affinity tests." << std::endl;
    }
#else
    std::cout << "\nWarning: CPU affinity setting not implemented for this OS. Dual-core tests will use available cores." << std::endl;
#endif

#if defined(__linux__)
    if (cpu_count >= 2)
    {
        const int dual_core_threads = 2;
        double time_mt_dual_core = measure_time_ms([&]()
                                                   {
                                                       std::vector<std::future<long long>> futures;
                                                       futures.reserve(dual_core_threads); // Use 2 threads
                                                       for (int i = 0; i < dual_core_threads; ++i)
                                                       {
                                                           futures.push_back(std::async(std::launch::async, simulate_io_task));
                                                       }
                                                       for (auto &fut : futures)
                                                       {
                                                           fut.get();
                                                       }});
        std::cout << "双核(亲和性[0,1])多线程(2线程)执行CPU密集型任务耗时: " << std::fixed << std::setprecision(2) << time_mt_dual_core << " ms" << std::endl;

        // --- Dual-core Sequential Execution (after setting affinity) ---
        double time_seq_dual_core = measure_time_ms([&]()
                                                    {
            for (int i = 0; i < num_tasks; ++i) {
                simulate_io_task();
            } });
        std::cout << "双核(亲和性[0,1])串行执行CPU密集型任务耗时: " << std::fixed << std::setprecision(2) << time_seq_dual_core << " ms" << std::endl;
    }
#endif // defined(__linux__)
```

## 测试结果

```shell
CPU核心数量: 16
多核串行执行CPU密集型任务耗时: 4045.36 ms
多核多线程(线程数=核心数*0.05=1)执行CPU密集型任务耗时: 402.56 ms
多核多线程(线程数=核心数*0.10=2)执行CPU密集型任务耗时: 402.82 ms
多核多线程(线程数=核心数*0.25=4)执行CPU密集型任务耗时: 405.05 ms
多核多线程(线程数=核心数*0.50=8)执行CPU密集型任务耗时: 406.98 ms
多核多线程(线程数=核心数*1.00=16)执行CPU密集型任务耗时: 408.85 ms
多核多线程(线程数=核心数*1.50=24)执行CPU密集型任务耗时: 412.15 ms
多核多线程(线程数=核心数*2.00=32)执行CPU密集型任务耗时: 420.52 ms
多核多线程(线程数=核心数*2.50=40)执行CPU密集型任务耗时: 417.49 ms
多核多线程(线程数=核心数*3.00=48)执行CPU密集型任务耗时: 416.76 ms
CPU affinity set to [0]
单核多线程执行CPU密集型任务耗时: 428.96 ms
单核串行执行CPU密集型任务耗时: 4043.67 ms

CPU affinity set to [0, 1] for dual-core tests
双核(亲和性[0,1])多线程(2线程)执行CPU密集型任务耗时: 402.80 ms
双核(亲和性[0,1])串行执行CPU密集型任务耗时: 4030.24 ms
```

## 结果分析

并非线程越多速度越快，可能这CPU密集型任务不适合多线程？但是**为什么开一个线程的时候速度要比串行快呢**？

# References

[CPU, processors, core, threads - Explained in layman's terms | GoLinuxCloud](https://www.golinuxcloud.com/processors-cpu-core-threads-explained/)

[协程的原理以及与线程的区别 - rhyme - 博客园](https://www.cnblogs.com/theRhyme/p/14061698.html)

[2022年了不会还有人没接触过Kotlin协程吧？_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1bA4y1Q7aQ/?spm_id_from=333.337.search-card.all.click&vd_source=a72320a874419eada50b8a012816d22d)

