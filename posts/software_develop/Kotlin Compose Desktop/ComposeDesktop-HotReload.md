---
date: 2025-05-02
title: ComposeDesktop中的热重载
category: kotlin
tags:
- kotlin
- compose
description: 配置Compose Desktop中的热重载
---

# Configuration

settings.gradle.kts

```kotlin
pluginManagement {
    plugins {
        kotlin("jvm").version(extra["kotlin.version"] as String)
        id("org.jetbrains.compose").version(extra["compose.version"] as String)
        id("org.jetbrains.kotlin.plugin.compose").version(extra["kotlin.version"] as String)
        id("org.gradle.toolchains.foojay-resolver-convention") version("0.8.0")
    }
}

// 启用 Foojay Toolchain Resolver
plugins {
    id("org.gradle.toolchains.foojay-resolver-convention")
}
```

build.gradle.kts

```kotlin
import org.jetbrains.compose.desktop.application.dsl.TargetFormat
import org.jetbrains.compose.reload.ComposeHotRun
import org.jetbrains.kotlin.compose.compiler.gradle.ComposeFeatureFlag

plugins {
    kotlin("jvm")
    id("org.jetbrains.compose")
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.20"
    id("org.jetbrains.compose.hot-reload") version "1.0.0-alpha09" // <- add this additionally
}

composeCompiler {
    featureFlags.add(ComposeFeatureFlag.OptimizeNonSkippingGroups)
}

kotlin {
    jvmToolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

tasks.withType<ComposeHotRun>().configureEach {
    mainClass.set("cn.wizard.sps.MainKt")
    // 明确为此任务设置 Java 启动器
    javaLauncher.set(javaToolchains.launcherFor {
        languageVersion.set(JavaLanguageVersion.of(21))
    })
}
```

Main.kt

```kotlin
fun main() {
    singleWindowApplication(
        title = "Shared Preferences Sandbox",
        state = WindowState(width = 1000.dp, height = 800.dp),
        alwaysOnTop = true
    ) {
        DevelopmentEntryPoint {
            MainPage()
        }
    }
}
```

然后不要直接运行呢，需gradle编译：gradle Run -PmainClass=cn.wizard.sps.MainKt



# References

[Compose Hot Reload is Now Available 🎉 | by Suhyeon Kim | Mar, 2025 | Medium](https://medium.com/@wisemuji/compose-hot-reload-is-now-available-3a9aee58b0fe)

[github:JetBrains/compose-hot-reload](https://github.com/JetBrains/compose-hot-reload)

[compose-hot-reload | Klibs.io](https://klibs.io/project/JetBrains/compose-hot-reload)
