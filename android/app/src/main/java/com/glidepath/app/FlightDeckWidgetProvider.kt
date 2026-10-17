package com.glidepath.app

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews

class FlightDeckWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) {
        ids.forEach { id ->
            val views = RemoteViews(context.packageName, R.layout.flight_deck_widget)
            views.setTextViewText(R.id.widget_next_task, FlightDeckStore.nextTask(context))
            views.setTextViewText(R.id.widget_progress, FlightDeckStore.summary(context))
            val open = PendingIntent.getActivity(context, 706, Intent(context, MainActivity::class.java), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
            views.setOnClickPendingIntent(R.id.widget_root, open)
            views.setOnClickPendingIntent(R.id.widget_open, open)
            manager.updateAppWidget(id, views)
        }
    }
}
